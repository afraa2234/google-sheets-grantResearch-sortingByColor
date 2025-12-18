# Google Sheets Grant Research - Color Sorting

Custom Google Apps Script for sorting spreadsheet rows based on cell background colors, with configurable color priority for grant research organization.

## How to Run the Solution

### Installation

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Copy the code from `sortByColor.gs`
4. Paste it into the script editor
5. Save the project (name it something like "Color Sorter")

### Usage

Run `sortRowsByColor()` from the Apps Script toolbar or set up a custom menu/button to trigger it.

The script automatically sorts all rows starting from **row 2** (assumes row 1 contains headers) based on column A's background color.

**Important:** This script only organizes rows based on existing background colors. You must manually color the cells in column A before running the script - it does not apply colors automatically.

## How It Works

### Color Priority Order

The script sorts rows by column A background color in this priority:

1. **Bright Green** (#6bc57f)
2. **Pale Green** (#b2e3be)
3. **Blue** (#caedfb)
4. **Blue alt** (#c1e4f5)
5. **Pink** (#f1ceee)
6. **Yellow** (#f3f7da)
7. **Grey** (#d0d0d0)
8. **White/None** (#ffffff)

Any unknown colors are placed at the end.

### Customizing Colors

You can modify the `colorOrder` array in the script to match your own color scheme. Simply replace the hex values with your desired colors in the priority order you want. The script will automatically sort based on your custom color list.

### Sorting Process

1. Reads all background colors from column A
2. Converts colors to hex format (handles rgb/rgba and hex)
3. Ranks each row based on color priority
4. Uses temporary columns to store sorting keys
5. Sorts entire rows by color rank, maintaining original order for same-colored rows
6. Removes temporary columns

## Use Case

Built for organizing grant research data where color coding indicates status or priority levels. Quick visual organization makes it easier to process large datasets at a glance.
