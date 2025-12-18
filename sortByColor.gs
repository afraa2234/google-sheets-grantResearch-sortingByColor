/* sorts rows by the background color of column A */
function sortRowsByColor() {
  const sheet = SpreadsheetApp.getActive().getActiveSheet();
  const startRow = 2;
  const lastRow = sheet.getLastRow();
  const numRows = lastRow - (startRow - 1);
  
  if (numRows <= 0) return;
  
  const lastCol = sheet.getLastColumn();
  
  /* getting column A background colors */
  const bgA = sheet.getRange(startRow, 1, numRows, 1).getBackgrounds().map(r => r[0]);
  
  /* converting color strings to hex format */
  const toHex = (c) => {
    if (!c) return '#ffffff';
    c = String(c).trim().toLowerCase();
    if (c.startsWith('#')) return c;
    
    /* converting rgb/rgba to hex */
    const m = c.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (m) {
      const r = Number(m[1]), g = Number(m[2]), b = Number(m[3]);
      const h = (n) => ('0' + Math.max(0, Math.min(255, n)).toString(16)).slice(-2);
      return `#${h(r)}${h(g)}${h(b)}`;
    }
    return c;
  };

  /* color priority order */
  const colorOrder = [
    '#6bc57f', // Bright Green
    '#b2e3be', // Pale Green
    '#caedfb', // Blue
    '#c1e4f5', // Blue alt
    '#f1ceee', // Pink
    '#f3f7da', // Yellow
    '#d0d0d0', // Grey
    '#ffffff', // White / None
  ];

  const colorRank = (c) => {
    const hex = toHex(c);
    const idx = colorOrder.indexOf(hex);
    return idx === -1 ? colorOrder.length + 1 : idx;
  };

  /* creating sort keys */
  const primaryKeys = bgA.map(c => colorRank(c));
  const secondaryKeys = Array.from({ length: numRows }, (_, i) => i);

  /* adding temp columns for sorting */
  const keyCol1 = lastCol + 1;
  const keyCol2 = lastCol + 2;
  sheet.insertColumnsAfter(lastCol, 2);
  
  /* writing sort keys to temp columns */
  sheet.getRange(startRow, keyCol1, numRows, 1).setValues(primaryKeys.map(v => [v]));
  sheet.getRange(startRow, keyCol2, numRows, 1).setValues(secondaryKeys.map(v => [v]));
  
  /* sorting rows by color priority */
  sheet
    .getRange(startRow, 1, numRows, keyCol2)
    .sort([
      { column: keyCol1, ascending: true },
      { column: keyCol2, ascending: true },
    ]);

  /* removing temp columns */
  sheet.deleteColumn(keyCol2);
  sheet.deleteColumn(keyCol1);
}