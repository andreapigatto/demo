/** Tableau global variable: Main API calls are pointing this global variable.
 * Check here to download further examples from Tableau: git clone https://github.com/tableau/extensions-api.git
 */
/* global tableau */

// eslint-disable-next-line import/no-unresolved
import { Dashboard, Worksheet, DataTable } from '@tableau/extensions-api-types'

export const init = (
  callback: (dash: Dashboard) => void,
  callbackReject: () => void
): void => {
  tableau.extensions
    .initializeAsync()
    .then(() => {
      // Fetch Dashboard information
      if (tableau.extensions.dashboardContent) {
        callback(tableau.extensions.dashboardContent.dashboard)
      }
    })
    .catch(() => {
      callbackReject()
    })
}

export const getParameterValue = (dash: Dashboard, paramName: string): void => {
  dash
    .getParametersAsync()
    .then((parameters) => {
      parameters.forEach((p) => {
        if (p.name === paramName) {
          return p.currentValue.formattedValue
        }
        return null
      })
    })
    .catch((error) => {
      return error
    })
}

export const getWorkSheetData = (worksheet: Worksheet): Promise<DataTable> =>
  worksheet.getSummaryDataAsync()
