import { Card, Image } from 'react-bootstrap';

//image
const imageUrl = 'https://picsum.photos/50';

export const RightSidebar = () => {
  const minirightsidebar = () => {
    (document.getElementById('rightSidebar') as HTMLElement).classList.toggle('right-sidebar');
    document.body.classList.toggle('right-sidebar-close');
  };
  return (
    <>
      <div className="right-sidebar-mini" id="rightSidebar">
        <div className="right-sidebar-panel p-0">
          <Card className="shadow-none">
            <Card.Body className="p-0">
              <div className="media-height p-3" data-scrollbar="init">
                <div className="d-flex align-items-center mb-4">
                  <div className="iq-profile-avatar status-online">
                    <Image className="rounded-circle avatar-50" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Anna Sthesia</h6>
                    <p className="mb-0">Just Now</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="iq-profile-avatar status-online">
                    <Image className="rounded-circle avatar-50" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Paul Molive</h6>
                    <p className="mb-0">Admin</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="iq-profile-avatar status-online">
                    <Image className="rounded-circle avatar-50" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Anna Mull</h6>
                    <p className="mb-0">Admin</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="iq-profile-avatar status-online">
                    <Image className="rounded-circle avatar-50" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Paige Turner</h6>
                    <p className="mb-0">Admin</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="iq-profile-avatar status-online">
                    <Image className="rounded-circle avatar-50" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Bob Frapples</h6>
                    <p className="mb-0">Admin</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="iq-profile-avatar status-online">
                    <Image className="rounded-circle avatar-50" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Barb Ackue</h6>
                    <p className="mb-0">Admin</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="iq-profile-avatar status-online">
                    <Image className="rounded-circle avatar-50" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Greta Life</h6>
                    <p className="mb-0">Admin</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="iq-profile-avatar status-away">
                    <Image className="rounded-circle avatar-50" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Ira Membrit</h6>
                    <p className="mb-0">Admin</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="iq-profile-avatar status-away">
                    <Image className="rounded-circle avatar-50" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Pete Sariya</h6>
                    <p className="mb-0">Admin</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="iq-profile-avatar status-online">
                    <Image className="rounded-circle avatar-50" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Monty Carlo</h6>
                    <p className="mb-0">Admin</p>
                  </div>
                </div>
              </div>
              <div className="right-sidebar-toggle bg-primary text-white mt-3 d-flex" onClick={minirightsidebar}>
                <span className="material-symbols-outlined">chat</span>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};
