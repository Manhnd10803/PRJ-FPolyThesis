import { Row, Col, Container, Card, Breadcrumb, Image } from 'react-bootstrap';
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'name', width: 150 },
  {
    field: 'avatar',
    headerName: 'avatar',
    width: 150,
    renderCell: params => (
      <Image src={params.value as string} alt="Avatar" className="align-self-center img-fluid avatar-50 rounded-pill" />
    ),
  },
  { field: 'email', headerName: 'email', width: 200 },
  { field: 'phone', headerName: 'phone', width: 150 },
  { field: 'address', headerName: 'address', width: 150 },
  { field: 'gender', headerName: 'gender', width: 150 },
  { field: 'status', headerName: 'status', width: 150 },
];
const data: GridRowsProp = [
  {
    name: 'John Doe',
    avatar:
      'https://images.unsplash.com/photo-1697441391334-7c5532f4677a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OHx8fGVufDB8fHx8fA%3D%3D',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main Street, City',
    gender: 'Male',
    status: 'active',
  },
  {
    name: 'Jane Smith',
    avatar:
      'https://images.unsplash.com/photo-1697441391334-7c5532f4677a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OHx8fGVufDB8fHx8fA%3D%3D',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    address: '456 Elm Street, Town',
    gender: 'Female',
    status: 'not active',
  },
  {
    name: 'Jane Smith',
    avatar:
      'https://images.unsplash.com/photo-1697441391334-7c5532f4677a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OHx8fGVufDB8fHx8fA%3D%3D',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    address: '456 Elm Street, Town',
    gender: 'Female',
    status: 'not active',
  },
  {
    name: 'Jane Smith',
    avatar:
      'https://images.unsplash.com/photo-1697441391334-7c5532f4677a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OHx8fGVufDB8fHx8fA%3D%3D',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    address: '456 Elm Street, Town',
    gender: 'Female',
    status: 'not active',
  },
  {
    name: 'Jane Smith',
    avatar:
      'https://images.unsplash.com/photo-1697441391334-7c5532f4677a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OHx8fGVufDB8fHx8fA%3D%3D',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    address: '456 Elm Street, Town',
    gender: 'Female',
    status: 'not active',
  },
  {
    name: 'Jane Smith',
    avatar:
      'https://images.unsplash.com/photo-1697441391334-7c5532f4677a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OHx8fGVufDB8fHx8fA%3D%3D',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    address: '456 Elm Street, Town',
    gender: 'Female',
    status: 'not active',
  },
  {
    name: 'Jane Smith',
    avatar:
      'https://images.unsplash.com/photo-1697441391334-7c5532f4677a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OHx8fGVufDB8fHx8fA%3D%3D',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    address: '456 Elm Street, Town',
    gender: 'Female',
    status: 'not active',
  },
  {
    name: 'Jane Smith',
    avatar:
      'https://images.unsplash.com/photo-1697441391334-7c5532f4677a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OHx8fGVufDB8fHx8fA%3D%3D',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    address: '456 Elm Street, Town',
    gender: 'Female',
    status: 'not active',
  },
  {
    name: 'Jane Smith',
    avatar:
      'https://images.unsplash.com/photo-1697441391334-7c5532f4677a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OHx8fGVufDB8fHx8fA%3D%3D',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    address: '456 Elm Street, Town',
    gender: 'Female',
    status: 'not active',
  },
  {
    name: 'Jane Smith',
    avatar:
      'https://images.unsplash.com/photo-1697441391334-7c5532f4677a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OHx8fGVufDB8fHx8fA%3D%3D',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    address: '456 Elm Street, Town',
    gender: 'Female',
    status: 'not active',
  },
];
export default function UserPage() {
  const getRowId = (row: any) => row.name;
  // const { data, loading } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 4,
  //   maxColumns: 6,
  // });

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
                    <DataGrid rows={data} columns={columns} getRowId={getRowId} slots={{ toolbar: GridToolbar }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
