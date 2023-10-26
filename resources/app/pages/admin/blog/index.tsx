import { Row, Col, Container, Card, Breadcrumb } from 'react-bootstrap';
import { DataGrid, GridColDef, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import React, { useState } from 'react';
import { AdminService } from '@/apis/services/admin.service';
import { Box, Modal } from '@mui/material';
import parse from 'html-react-parser';
import { useQuery } from '@tanstack/react-query';
import { IBlogsAdmin } from '@/models/blog';

const style = {
  position: 'absolute' as 'absolute',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type detailBlogType = {
  id: number;
  title: string;
  content: string;
};

export const BlogList = () => {
  const [open, setOpen] = React.useState(false);
  const [detailBlog, setDetailBlog] = useState<detailBlogType>({
    id: 0,
    title: '',
    content: '',
  });
  const handleDetailClick = async (id: number) => {
    setOpen(true);
    const { data } = await AdminService.BlogDetail(id);
    setDetailBlog(data);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      headerAlign: 'center',
      cellClassName: 'd-flex justify-content-center',
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
      headerAlign: 'center',
      cellClassName: 'd-flex justify-content-center',
    },
    {
      field: 'thumbnail',
      headerName: 'Thumbnail',
      width: 250,
      renderCell: params => {
        const thumbnailData = params.row.thumbnail;

        if (typeof thumbnailData === 'string') {
          return <img src={`/storage/${thumbnailData}`} alt="Thumbnail" style={{ width: '100%', height: 'auto' }} />;
        }
      },
      headerAlign: 'center',
      cellClassName: 'd-flex justify-content-center',
    },
    {
      field: 'content',
      headerName: 'content',
      width: 150,
      headerAlign: 'center',
      cellClassName: 'd-flex justify-content-center',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions d-flex justify-content-center',
      getActions: ({ id }) => {
        const numberId = Number(id);
        return [
          <GridActionsCellItem
            icon={<FindInPageIcon />}
            label="Detail"
            onClick={() => handleDetailClick(numberId)}
            className="textPrimary"
            color="inherit"
          />,
        ];
      },
      headerAlign: 'center',
    },
  ];
  const getBlogList = async (): Promise<IBlogsAdmin> => {
    const { data } = await AdminService.BlogList();
    return data;
  };
  const { data, isLoading } = useQuery<IBlogsAdmin>({ queryKey: ['blogs'], queryFn: getBlogList });

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12">
              <Card className="position-relative inner-page-bg bg-primary" style={{ height: '150px' }}>
                <div className="inner-page-title">
                  <h3 className="text-white">List Blog</h3>
                  <p className="text-white">
                    <Breadcrumb bsPrefix="breadcrumb bg-primary">
                      <Breadcrumb.Item active className="text-white">
                        Admin
                      </Breadcrumb.Item>
                      <Breadcrumb.Item active className="text-white">
                        Blog List
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
                      <p>Loading...</p>
                    ) : (
                      <DataGrid rows={data || []} columns={columns} slots={{ toolbar: GridToolbar }} className="" />
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: '60%' }}>
            <h2 id="child-modal-title" className="text-center">
              {detailBlog.title}
            </h2>
            <p id="child-modal-description">{parse(detailBlog.content)}</p>
          </Box>
        </Modal>
        ,
      </div>
    </>
  );
};
