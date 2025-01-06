import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { GridRowEditStopReasons } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { getGoodsList, postGoods, updateGoodsId } from '../api/apiGoods';
import { GridRowModes } from '@mui/x-data-grid';
import Swal from 'sweetalert2';

function EditToolbar(props) {
  const { setGoods, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setGoods(oldRows => [
      ...oldRows,
      { id, name: '', quantity: '', storageLocation: '', isNew: true },
    ]);
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));

  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid({ rows, columns, setGoods, setRowModesModel, rowModesModel }) {


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow };
    if (newRow.isNew) {
      try {
        await postGoods(newRow, newRow.id);
        Swal.fire({
          showCloseButton: false,
          showCancelButton: false,
          showConfirmButton: false,
          width: 200,
          position: "top-start",
          title: "info!",
          text: "Успешно",
          timer: 1500,
        });
        await setGoods((await getGoodsList()).data);
      } catch (e) {
        Swal.fire({
          showCloseButton: false,
          showCancelButton: false,
          showConfirmButton: false,
          width: 200,
          position: "top-end",
          title: "Error!",
          text: "Do you want to continue",
          timer: 1500,
        });
      }
    } else {
      try {
        await updateGoodsId(newRow, newRow.id);
        Swal.fire({
          showCloseButton: false,
          showCancelButton: false,
          showConfirmButton: false,
          width: 200,
          position: "top-start",
          title: "info!",
          text: "Успешно",
          timer: 1500,
        });
        await setGoods((await getGoodsList()).data);
      } catch (e) {
        Swal.fire({
          showCloseButton: false,
          showCancelButton: false,
          showConfirmButton: false,
          width: 200,
          position: "top-end",
          title: "Error!",
          text: "Do you want to continue",
          timer: 1500,
        });
      }
    }
  setGoods(rows.map(row => (row.id === newRow.id ? updatedRow : row)));
  return updatedRow;
};

const handleRowModesModelChange = newRowModesModel => {
  setRowModesModel(newRowModesModel);
};

return (
  <Box
    sx={{
      height: '50%',
      width: '100%',
      '& .actions': {
        color: 'text.secondary',
      },
      '& .textPrimary': {
        color: 'text.primary',
      },
    }}
  >
    <DataGrid
      rows={rows}
      columns={columns}
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      slots={{
        toolbar: EditToolbar,
      }}
      slotProps={{
        toolbar: { setGoods, setRowModesModel },
      }}
    />
  </Box>
);
}