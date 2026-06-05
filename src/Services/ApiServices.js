import { settings } from "../Config/Settings";

const token = {
  getUserToken: () => localStorage.getItem("token"),
  clearUserTokenData: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export async function submitRequestAsync(
  endpoint,
  method = "GET",
  body = null,
  addHeaders = {}
) {
  const url = `${settings.backendServer}/${endpoint}`.replace(
    /([^:]\/)\/+/g,
    "$1"
  );

  const isFormData = body instanceof FormData;
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token.getUserToken()}`,
    ...(!isFormData && { "Content-Type": "application/json; charset=utf-8" }),
    ...addHeaders,
  };

  try {
    const response = await fetch(url, {
      method,
      headers,
      body:
        method !== "GET"
          ? isFormData
            ? body
            : JSON.stringify(body || {})
          : undefined,
    });

    let res = {};
    if (response.status !== 204) {
      const text = await response.text();
      try {
        res = JSON.parse(text);
      } catch {
        res = text;
      }
    }

    if (!response.ok) {
      throw new Error(res?.message || `Error ${response.status}: Request failed`);
    }

    if (res && typeof res === "object" && "data" in res) return res.data;
    if (Array.isArray(res)) return res;
    return res || [];
  } catch (error) {
    if (error.message.includes("401")) {
      token.clearUserTokenData();
      throw new Error("Session expired, please login again.");
    }
    if (
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch")
    ) {
      throw new Error("Network issue! Please check your connection.");
    }
    throw new Error(error.message || "Unexpected error occurred");
  }
}