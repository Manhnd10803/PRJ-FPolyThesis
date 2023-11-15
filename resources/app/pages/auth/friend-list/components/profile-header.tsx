export const ProfileHeader = (props: any) => {
  return (
    <>
      <div className="header-for-bg">
        <div className="background-header position-relative">
          <img src={props.img} className="w-100" alt="header-bg" style={{ height: '130px !important' }} />
          <div className="title-on-header">
            <div className="data-block">
              <h2>{props.title}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
