"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { client } from "@/lib/turso";
import { redirect } from "next/navigation";

// const testUser = {
//   id: "1",
//   email: "contact@cosdensolutions.io",
//   password: "12345678",
// };

const loginSchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .email({ message: "Invalid email address" })
    .trim(),
  password: z
    .string()
    //.min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  let redirectPath: string | null = null;

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  try {
    const userQuery = await client.execute({
      sql: "SELECT user_id, email, password, role FROM users WHERE email = ?",
      args: [email],
    });

    console.log("userQuery", userQuery);

    if (userQuery.rows.length === 0) {
      return {
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

    const user = userQuery.rows[0];
    console.log("user", user);

    if (password !== user.password) {
      return {
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

    await createSession(user.user_id);

    redirectPath = `/dashboard`;
  } catch (error) {
    console.error("Login error:", error);
    return {
      errors: {
        email: ["An error occurred. Please try again."],
      },
    };
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }

  // Test user
  // if (email !== testUser.email || password !== testUser.password) {
  //   return {
  //     errors: {
  //       email: ["Invalid email or password"],
  //     },
  //   };
  // }

  // await createSession(testUser.id);

  // redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
