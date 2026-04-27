interface DemoRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  org: string;
  role: string;
  level: string;
  message: string;
  consent: boolean;
}

type FieldErrors = Partial<Record<keyof DemoRequestPayload, string>>;

interface DemoRequestError extends Error {
  fieldErrors?: FieldErrors;
}

interface ErrorResponse {
  message?: string;
  errors?: FieldErrors;
}

export async function submitDemoRequest(
  payload: DemoRequestPayload,
): Promise<void> {
  const response = await fetch("/api/demo-requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return;
  }

  let errorResponse: ErrorResponse | undefined;

  try {
    errorResponse = (await response.json()) as ErrorResponse;
  } catch {
    errorResponse = undefined;
  }

  const error = new Error(
    errorResponse?.message ?? "Something went wrong while submitting your request.",
  ) as DemoRequestError;

  if (errorResponse?.errors) {
    error.fieldErrors = errorResponse.errors;
  }

  throw error;
}
