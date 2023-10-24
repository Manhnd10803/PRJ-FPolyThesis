import { Row, Col, Container, Card, Breadcrumb } from 'react-bootstrap';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { AdminService } from '@/apis/services/admin.service';
import { useQuery } from '@tanstack/react-query';
import { ActionsCell } from './components/actions';
import { IUsersAdmin } from '@/models/user';
import { useNavigate } from 'react-router-dom';

export const UserPage = () => {
  const navigate = useNavigate();
  const handleDeleteClick = (id: number) => {
    // Xử lý logic khi nhấn nút "Delete"
    console.log(`Deleted user with ID ${id}`);
  };

  const handleDetailsClick = (id: number) => {
    // Xử lý logic khi nhấn nút "Xem chi tiết"
    navigate(`profile/${id}`, { state: { id: id } });
    console.log(`View details of user with ID ${id}`);
  };
  const getDisplayValue = (value: any) => value || 'chưa cập nhật';
  const columns: GridColDef[] = [
    {
      field: 'stt',
      headerName: 'STT',
      width: 40,
    },
    {
      field: 'username',
      headerName: 'Tên',
      width: 150,
      renderCell: params => <div>{getDisplayValue(params.row.username)}</div>,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      renderCell: params => <div>{getDisplayValue(params.row.email)}</div>,
    },
    {
      field: 'birthday',
      headerName: 'Birthday',
      width: 150,
      renderCell: params => <div>{getDisplayValue(params.row.birthday)}</div>,
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      width: 150,
      renderCell: params => <div>{getDisplayValue(params.row.phone)}</div>,
    },
    {
      field: 'gender',
      headerName: 'Giới tính',
      width: 100,
      renderCell: params => <div>{getDisplayValue(params.row.gender)}</div>,
    },
    {
      field: 'major.majors_name',
      headerName: 'Chuyên ngành',
      width: 150,
      renderCell: params => <div>{getDisplayValue(params.row.major.majors_name)}</div>,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: params => <div>{getDisplayValue(params.row.status)}</div>,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: params => (
        <ActionsCell
          handleDeleteClick={() => handleDeleteClick(params.row.id)}
          handleDetailsClick={() => handleDetailsClick(params.row.id)}
        />
      ),
    },
  ];

  const fetchUsers = async (): Promise<IUsersAdmin> => {
    const { data } = await AdminService.getUsersAdmin();
    const userData = data.users.map((user: IUsersAdmin, index: number) => ({
      ...user,
      stt: index + 1,
    }));
    return userData;
  };
  const { data, isLoading } = useQuery<IUsersAdmin>({ queryKey: ['users'], queryFn: fetchUsers });

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12">
              <Card className="position-relative inner-page-bg bg-primary" style={{ height: '150px' }}>
                <div className="inner-page-title">
                  <h3 className="text-white">List user</h3>
                  <p className="text-white">
                    <Breadcrumb bsPrefix="breadcrumb bg-primary">
                      <Breadcrumb.Item active className="text-white">
                        Admin
                      </Breadcrumb.Item>
                      <Breadcrumb.Item active className="text-white">
                        Users
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </p>
                </div>
              </Card>
            </Col>
            <Col sm="12">
              <Card>
                <Card.Body>
                  <div className="table-responsive">
                    {isLoading ? (
                      // Hiển thị biểu tượng hoặc thông báo "Loading..."
                      <p>Loading...</p>
                    ) : (
                      // Hiển thị dữ liệu trong DataGrid
                      <DataGrid rows={data || []} columns={columns} slots={{ toolbar: GridToolbar }} />
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
