import React, { useState } from 'react';
import { Row, Col, Container, Card, Breadcrumb } from 'react-bootstrap';
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'name', width: 150 },
  { field: 'position', headerName: 'position', width: 150 },
  { field: 'office', headerName: 'office', width: 150 },
  { field: 'age', headerName: 'age', width: 150 },
  { field: 'startdate', headerName: 'startdate', width: 150 },
  { field: 'salary', headerName: 'salary', width: 150 },
];
const data: GridRowsProp = [
  {
    name: 'Tiger Nixon',
    position: 'System Architect',
    office: 'Edinburgh',
    age: '61',
    startdate: '2011/04/25',
    salary: '$320,800',
  },
  {
    name: 'Garrett Winters',
    position: 'Accountant',
    office: 'Tokyo',
    age: '63',
    startdate: '2011/07/25',
    salary: '$170,750',
  },
  {
    name: 'Ashton Cox',
    position: 'Junior Technical Author',
    office: 'San Francisco',
    age: '66',
    startdate: '2009/01/12',
    salary: '$86,000',
  },
  {
    name: 'Cedric Kelly',
    position: 'Senior Javascript Developer',
    office: 'Edinburgh',
    age: '22',
    startdate: '2012/03/29',
    salary: '$433,060',
  },
  {
    name: 'Airi Satou',
    position: 'Accountant',
    office: 'Tokyo',
    age: '33',
    startdate: '2008/11/28',
    salary: '$162,700',
  },
  {
    name: 'Brielle Williamson',
    position: 'Integration Specialist',
    office: 'New York',
    age: '61',
    startdate: '2012/12/02',
    salary: '$372,000',
  },
  {
    name: 'Herrod Chandler',
    position: 'Sales Assistant',
    office: 'San Fanscisco',
    age: '59',
    startdate: '2012/08/06',
    salary: '$137,500',
  },
  {
    name: 'Rhona Davidson',
    position: 'Integration Specialist',
    office: 'Tokyo',
    age: '55',
    startdate: '2010/10/14',
    salary: '$327,900',
  },
  {
    name: 'Colleen Hurst',
    position: 'Javascript Developer',
    office: 'San Francisco',
    age: '39',
    startdate: '2009/09/15',
    salary: '$205,500',
  },
  {
    name: 'Sonya Frost',
    position: 'Software Engineer',
    office: 'Edinburgh',
    age: '23',
    startdate: '2008/12/13',
    salary: '$103,600',
  },
  {
    name: 'Jena Gaines',
    position: 'Office Manager',
    office: 'London',
    age: '30',
    startdate: '2008/12/19',
    salary: '$90,560',
  },

  {
    name: 'Quinn Flynn',
    position: 'Support Lead',
    office: 'Edinburgh',
    age: '22',
    startdate: '2013/03/03',
    salary: '$342,000',
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
