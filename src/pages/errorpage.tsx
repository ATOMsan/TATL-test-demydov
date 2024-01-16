import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorBoundary() {
  let error = useRouteError();
  return isRouteErrorResponse(error) ? (
    <h1 style={{ textAlign: "center" }}>{error.status} Сталась помилка!</h1>
  ) : (
    <h1 style={{ textAlign: "center" }}>Сталась помилка!</h1>
  );
}
