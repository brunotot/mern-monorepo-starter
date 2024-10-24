import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import React from "react";

export function ResponsiveTable() {
  // Define data
  const data = [
    { id: 1, name: "Item 1", description: "Description 1", detail: "Detail of Item 1" },
    { id: 2, name: "Item 2", description: "Description 2", detail: "Detail of Item 2" },
    { id: 3, name: "Item 3", description: "Description 3", detail: "Detail of Item 3" },
    { id: 4, name: "Item 4", description: "Description 4", detail: "Detail of Item 4" },
    // Add more items as needed
  ];

  // State variables
  const [filterText, setFilterText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState(data);
  const [selectedItemIndex, setSelectedItemIndex] = React.useState<number | null>(null);

  // Update filteredData when filterText changes
  React.useEffect(() => {
    const filtered = data.filter(
      item =>
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.description.toLowerCase().includes(filterText.toLowerCase()),
    );
    setFilteredData(filtered);
    setSelectedItemIndex(null);
  }, [filterText]);

  // Handlers
  const handleSelectItem = (index: number) => {
    setSelectedItemIndex(index);
  };

  const handlePrevious = () => {
    setSelectedItemIndex(prevIndex =>
      prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : prevIndex,
    );
  };

  const handleNext = () => {
    setSelectedItemIndex(prevIndex =>
      prevIndex !== null && prevIndex < filteredData.length - 1 ? prevIndex + 1 : prevIndex,
    );
  };

  return (
    <mui.Box sx={{ p: 2 }}>
      <mui.TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
        sx={{ mb: 2 }}
      />

      {selectedItemIndex !== null ? (
        // Display selected item
        <mui.Box>
          <mui.Typography variant="h6">{filteredData[selectedItemIndex].name}</mui.Typography>
          <mui.Typography variant="body1">
            {filteredData[selectedItemIndex].description}
          </mui.Typography>
          <mui.Typography variant="body2">{filteredData[selectedItemIndex].detail}</mui.Typography>
          <mui.Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <mui.Button
              variant="contained"
              onClick={handlePrevious}
              disabled={selectedItemIndex === 0}
              startIcon={<icons.ArrowBack />}
            >
              Previous
            </mui.Button>
            <mui.Button
              variant="contained"
              onClick={handleNext}
              disabled={selectedItemIndex === filteredData.length - 1}
              endIcon={<icons.ArrowForward />}
            >
              Next
            </mui.Button>
          </mui.Box>
        </mui.Box>
      ) : (
        // Display list of items
        <mui.Box>
          {filteredData.length === 0 ? (
            <mui.Typography>No items found.</mui.Typography>
          ) : (
            <mui.List>
              {filteredData.map((item, index) => (
                <mui.ListItem key={item.id} onClick={() => handleSelectItem(index)}>
                  <mui.ListItemText primary={item.name} secondary={item.description} />
                </mui.ListItem>
              ))}
            </mui.List>
          )}
        </mui.Box>
      )}
    </mui.Box>
  );
}
