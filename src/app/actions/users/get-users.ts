"use server"
import { ApiReturnType } from "@/types"
import { API_URL } from "@/utils"
import { cookies } from "next/headers"

export const getUsers = async (): Promise<ApiReturnType> => {
  const cookieStore = await cookies()
  // Token existence is checked at middleware level, so it's safe to assume it's always present
  const token = cookieStore.get("token")
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    next: {
      tags: ["users"]
    }
  })

  if (!response.ok) {
    return { success: false, data: null, error: "Error al obtener usuarios" }
  }

  const data = await response.json()
  return { success: true, data, error: null }
}


