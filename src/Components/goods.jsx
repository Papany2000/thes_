import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { getGoodsList, removeGoodsId } from './api/apiGoods';
import FullFeaturedCrudGrid from './ui/dataTable';
import { GridRowModes } from '@mui/x-data-grid';
import { UserContext } from './context/contextAuth';
import Swal from 'sweetalert2';


function Goods() {

  const [goods, setGoods] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const { setAuth } = React.useContext(UserContext)
 

  React.useEffect(() => {
    getGoodsList()
      .then((result) => {
        setGoods(result.data);
      })
      .catch((e) => {
        localStorage.setItem('access_token', '')
        setAuth(false)
        Swal.fire({
          showCloseButton: false,
          showCancelButton: false,
          showConfirmButton: false,
          width: 200,
          position: "top-end",
          title: "Внимание!",
          text: "Истёк токен. Залогинтесь!",
          timer: 2500,
        });
        //alert('Истёк токен. Залогинтесь!')
      });
  }, [setAuth]);
  const handleEditClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = id => async () => {
    const res = window.confirm("Вы уверены");
    if (!res) {
      return false;
    }
    await removeGoodsId(id);
    setGoods((await getGoodsList()).data);
  };

  const handleCancelClick = id => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find(row => row.id === id);
    if (editedRow.isNew) {
      setGoods(rows.filter(row => row.id !== id));
    }
  };
  const rows = goods;
  const columns = [
    {
      field: 'name',
      minWidth: 450,
      headerName: 'Изделие',
      editable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'quantity',
      headerName: 'Количество',
      editable: true,
      width: 175,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'storageLocation',
      width: 650,
      headerName: 'Место хранения',
      editable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <div className={'goods'}>
      <h2>Список забытых вещей</h2>
      <FullFeaturedCrudGrid rows={rows}
        columns={columns}
        setGoods={setGoods}
        setRowModesModel={setRowModesModel}
        rowModesModel={rowModesModel}
      />
    </div>
  );
}

export default Goods;
