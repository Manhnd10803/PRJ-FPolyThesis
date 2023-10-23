import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';

interface ActionsCellProps {
  handleDeleteClick: () => void;
  handleDetailsClick: () => void;
}

export const ActionsCell: React.FC<ActionsCellProps> = ({ handleDeleteClick, handleDetailsClick }) => {
  return (
    <>
      <GridActionsCellItem
        icon={<InfoIcon />}
        label=""
        sx={{
          color: 'primary.main',
        }}
        onClick={handleDetailsClick}
      />
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Cancel"
        sx={{
          color: 'primary.main',
        }}
        onClick={handleDeleteClick}
      />
    </>
  );
};
