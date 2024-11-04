"use server"
import { API_URL } from "@/utils"
import { cookies } from "next/headers"
import { ApiReturnType } from "@/types"
import { CreateUser } from "@/app/dashboard/_types"
import { revalidateTag } from "next/cache"

export const createUser = async ({ email, firstName, isActive, lastName, password }: CreateUser): Promise<ApiReturnType> => {
  const cookieStore = await cookies()
  // Token existence is checked at middleware level, so it's safe to assume it's always present
  const token = cookieStore.get("token")

  const name = `${firstName} ${lastName}`

  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, isActive, password }),
  })

  if (!response.ok) {
    return { success: false, data: null, error: "Error al crear usuario" }
  }

  const data = await response.json()

  revalidateTag("users")
  return { success: true, data, error: null }
}