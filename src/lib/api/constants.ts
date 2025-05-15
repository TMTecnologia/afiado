/**
 * HTTP response status codes
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status}
 */
export const HTTP_STATUS = {
  /** The request succeeded, and a new resource was created as a result */
  CREATED: 201,
  /** The client client is authenticated but lacks sufficient permissions */
  FORBIDDEN: 403,
  /** The request was well-formed but was unable to be followed due to semantic errors */
  UNPROCESSABLE_CONTENT: 422,
  /** The user has sent too many requests in a given amount of time (Rate Limiting) */
  TOO_MANY_REQUESTS: 429,
  /** The server has encountered a situation it does not know how to handle */
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Catalog of error codes and their default messages
 */
export const ErrorCodeCatalog = {
  FORBIDDEN: "O cliente não tem direitos de acesso ao conteúdo",
  INTERNAL_SERVER_ERROR: "Erro ao processar requisição",
  INVALID_JSON: "Payload JSON inválido",
  TOO_MANY_REQUESTS: "O usuário enviou muitas requisições",
  VALIDATION_ERROR: "Falha na validação",
} as const;

/**
 * Type for error codes
 */
export type ErrorCode = keyof typeof ErrorCodeCatalog;
