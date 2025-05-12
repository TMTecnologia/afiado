/**
 * HTTP response status codes
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status}
 */
export const HTTP_STATUS = {
  /** The request succeeded, and a new resource was created as a result */
  CREATED: 201,
  /** The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource */
  FORBIDDEN: 403,
  /** The request was well-formed but was unable to be followed due to semantic errors */
  UNPROCESSABLE_CONTENT: 422,
  /** The server has encountered a situation it does not know how to handle */
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Catalog of error codes and their default messages
 */
export const ErrorCodeCatalog = {
  FORBIDDEN: "O cliente não tem direitos de acesso ao conteúdo",
  INTERNAL_SERVER_ERROR:
    "Erro ao processar requisição. Tente novamente mais tarde.",
  INVALID_JSON: "Payload JSON inválido",
  VALIDATION_ERROR: "Falha na validação",
} as const;

/**
 * Type for error codes
 */
export type ErrorCode = keyof typeof ErrorCodeCatalog;

export const responseStatusToErrorCode = (status: number): ErrorCode => {
  if (status === HTTP_STATUS.FORBIDDEN) {
    return "FORBIDDEN";
  }
  if (status === HTTP_STATUS.UNPROCESSABLE_CONTENT) {
    return "VALIDATION_ERROR";
  }
  return "INTERNAL_SERVER_ERROR";
};

export const responseToErrorMessage = (response: ResponseInit) => {
  if (response.status === HTTP_STATUS.FORBIDDEN) {
    return ErrorCodeCatalog.FORBIDDEN;
  }
  if (response.status === HTTP_STATUS.UNPROCESSABLE_CONTENT) {
    return ErrorCodeCatalog.VALIDATION_ERROR;
  }
  return `Erro ao processar a solicitação (${response.status} ${response.statusText})`;
};
