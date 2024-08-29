export default function mapStatusHTTP(status: string, error_code?: string): number {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'ERROR':
      switch (error_code) {
        case 'MEASURES_NOT_FOUND': return 404;
        case 'MEASURE_NOT_FOUND': return 404;
        case 'CONFIRMATION_DUPLICATE': return 409;
        // Outros casos de erro
        default: return 500;
      }
    default: return 500;
  }
}
