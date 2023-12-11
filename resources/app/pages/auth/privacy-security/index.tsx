import { Accordion, Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';

export const PrivacySecurityPage = () => {
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12">
              <Card className="position-relative inner-page-bg bg-primary">
                <div
                  className="d-flex flex-wrap align-items-center justify-content-between p-5"
                  style={{ height: '100px' }}
                >
                  <div className=" d-flex align-items-center text-center profile-forum-items p-0 m-0 w-75">
                    <h3
                      className="text-white"
                      style={{ fontWeight: 'bold', fontSize: '25px', color: 'blue', textTransform: 'uppercase' }}
                    >
                      Điều khoản và bảo mật
                    </h3>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Chính sách quyền riêng tư</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Chính sách Cookie</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Điều khoản và cam kết dịch vụ</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">Duy trì tính bảo mật tài khoản</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <strong>Chính sách quyền riêng tư là gì và điều chỉnh đối tượng nào?</strong>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            FpolyZone muốn bạn nắm được loại thông tin chúng tôi thu thập, cũng như cách chúng tôi sử
                            dụng và chia sẻ thông tin đó. Vì thế, bạn nên đọc Chính sách quyền riêng tư của chúng tôi.
                            Như vậy, bạn sẽ sử dụng sản phẩm của FpolyZone theo cách phù hợp với mình.
                          </p>
                          <p>
                            Chính sách quyền riêng tư giải thích cách chúng tôi thu thập, sử dụng, chia sẻ, lưu giữ và
                            chuyển thông tin. Chúng tôi còn cho biết những quyền bạn có. Từng mục trong Chính sách này
                            đều cung cấp ví dụ hữu ích và sử dụng cách diễn đạt đơn giản hơn để các biện pháp của chúng
                            tôi trở nên dễ hiểu. Ngoài ra, chúng tôi đã thêm liên kết đến các thông tin và nguồn lực để
                            bạn có thể tìm hiểu thêm về những chủ đề liên quan đến quyền riêng tư mà bạn quan tâm.
                          </p>
                          <p>Hãy đọc toàn bộ chính sách ở bên dưới một cách cẩn thận.</p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          <strong>Chúng tôi thu thập những thông tin nào?</strong>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Trong chính sách này, chúng tôi nêu các loại thông tin mình thu thập. Dưới đây là một số
                            loại thông tin quan trọng: Chúng tôi thu thập:
                          </p>
                          <ul>
                            <li>
                              Thông tin bạn cung cấp khi đăng ký Sản phẩm của chúng tôi và tạo trang cá nhân, chẳng hạn
                              như địa chỉ email hoặc số điện thoại
                            </li>
                            <li>
                              Hoạt động của bạn trên Sản phẩm của chúng tôi, bao gồm cả nội dung bạn nhấp vào hoặc
                              thích, bài viết và ảnh của bạn, cũng như tin nhắn bạn gửi.{' '}
                            </li>
                            <li>
                              {' '}
                              Bạn bè hoặc người theo dõi bạn, cũng như hoạt động của họ trên Sản phẩm của chúng tôi
                            </li>
                            <li>
                              Thông tin từ điện thoại, máy tính hoặc máy tính bảng mà bạn sử dụng Sản phẩm của chúng
                              tôi, chẳng hạn như loại thiết bị và phiên bản ứng dụng bạn dùng
                            </li>
                            <li>
                              Thông tin về bạn mà chúng tôi thu thập và xử lý phụ thuộc vào cách bạn sử dụng sản phẩm
                              của chúng tôi.
                            </li>
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>
                          <strong>Hoạt động của bạn và thông tin bạn cung cấp</strong>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Trên sản phẩm của chúng tôi, bạn có thể gửi tin nhắn, chụp ảnh và quay video, mua hoặc bán
                            hàng và làm nhiều việc khác. Chúng tôi gọi tất cả những việc bạn có thể làm trên Sản phẩm là
                            "hoạt động". Chúng tôi thu thập thông tin về hoạt động của bạn trên các Sản phẩm và thông
                            tin bạn cung cấp , chẳng hạn như:
                          </p>
                          <ul>
                            <li> Nội dung bạn tạo, chẳng hạn như bài viết, bình luận hoặc báo cáo</li>
                            <li>
                              {' '}
                              Tin nhắn bạn gửi và nhận (kể cả nội dung trong đó) theo luật hiện hành. Chúng tôi sẽ không
                              xem được nội dung tin nhắn
                            </li>
                            <li> Hashtag bạn sử dụng</li>
                            <li>
                              {' '}
                              Thời điểm, tần suất và khoảng thời gian bạn hoạt động trên các Sản phẩm của chúng tôi
                            </li>
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>
                          <strong>Nếu bạn không cho chúng tôi thu thập một số thông tin thì sao?</strong>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Chúng tôi cần phải có một số thông tin để vận hành Sản phẩm. Các thông tin khác không bắt
                            buộc, nhưng nếu thiếu thì chất lượng trải nghiệm của bạn có thể bị ảnh hưởng.
                          </p>
                          <p>
                            Chúng tôi cần thông tin này để cung cấp Sản phẩm cho bạn. Nếu bạn không muốn chúng tôi thu
                            thập thông tin này, bạn có thể ngừng sử dụng Sản phẩm của chúng tôi hoặc xóa tài khoản của
                            mình bất cứ lúc nào.
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="4">
                        <Accordion.Header>
                          <strong>Chúng tôi sử dụng thông tin của bạn như thế nào?</strong>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Chúng tôi sử dụng thông tin mình thu thập để mang lại trải nghiệm dành riêng cho bạn , cũng
                            như để phục vụ các mục đích khác mà chúng tôi giải thích chi tiết ở bên dưới.
                          </p>
                          <p>
                            Để phục vụ cho một vài trong số các mục đích này, chúng tôi sử dụng thông tin trên các Sản
                            phẩm của mình và trên các thiết bị của bạn. Thông tin chúng tôi sử dụng cho các mục đích này
                            sẽ được hệ thống của chúng tôi xử lý tự động. Tuy nhiên, trong một số trường hợp, chúng tôi
                            cũng xét duyệt thủ công để truy cập và xem xét thông tin của bạn.
                          </p>
                          <p>
                            Để hạn chế sử dụng thông tin liên kết với người dùng cá nhân, trong một số trường hợp, chúng
                            tôi loại bỏ thông tin nhận dạng hoặc tổng hợp hay ẩn danh thông tin để thông tin đó không
                            nhận dạng bạn được nữa. Chúng tôi sử dụng thông tin trên theo cách giống với khi dùng thông
                            tin của bạn như mô tả trong mục này.
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="5">
                        <Accordion.Header>
                          <strong>
                            Bạn có thể quản lý hoặc xóa thông tin của mình và thực hiện các quyền mình có bằng cách nào?
                          </strong>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Chúng tôi cung cấp cho bạn nhiều công cụ để xem, quản lý, tải xuống và xóa thông tin như bên
                            dưới. Bạn cũng có thể quản lý thông tin của mình bằng cách truy cập vào phần cài đặt của Sản
                            phẩm bạn dùng. Ngoài ra, bạn có thể có các quyền riêng tư khác theo luật hiện hành.
                          </p>
                          <p>
                            Để thực hiện các quyền của bạn, hãy truy cập vào Trung tâm trợ giúp của chúng tôi, phần cài
                            đặt FpolyZone, cũng như phần cài đặt có trên thiết bị của bạn.
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="6">
                        <Accordion.Header>
                          <strong>Làm cách nào bạn biết chính sách này đã thay đổi?</strong>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Chúng tôi sẽ thông báo cho bạn trước khi thực hiện các thay đổi quan trọng đối với Chính
                            sách này. Bạn sẽ có cơ hội xem kỹ Chính sách đã sửa đổi trước khi chọn tiếp tục sử dụng Sản
                            phẩm của chúng tôi.
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <strong>Cookie là gì và chính sách này đề cập đến những quy định nào?</strong>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Chính sách này giải thích cách chúng tôi sử dụng cookie và các công nghệ tương tự khác để
                            nhận thông tin khi bạn truy cập hoặc tương tác với dịch vụ của chúng tôi được cung cấp qua
                            các trang web, ứng dụng, thông báo email và các dịch vụ trực tuyến khác của FpolyZone. Chính
                            sách này không áp dụng cho các trang web của bên thứ ba mà chúng tôi không sở hữu hoặc kiểm
                            soát, bao gồm cả các trang web, dịch vụ hoặc thông tin của bên thứ ba. Bạn nên đọc kỹ chính
                            sách cookie của bên thứ ba đó để hiểu rõ hơn về cách họ sử dụng cookie.
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          <strong>Tại sao chúng tôi sử dụng cookie?</strong>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Chúng tôi sử dụng cookie và các công nghệ tương tự khác để cung cấp và hỗ trợ các dịch vụ
                            của chúng tôi theo các mục đích sau:
                          </p>
                          <ul>
                            <li>
                              Cung cấp các dịch vụ của chúng tôi. Chúng tôi sử dụng cookie để cung cấp các dịch vụ của
                              chúng tôi, như cho phép bạn đăng nhập vào các dịch vụ của chúng tôi, sử dụng các tính năng
                              được cung cấp bởi chúng tôi, tìm hiểu cách bạn tương tác với dịch vụ của chúng tôi, và cải
                              thiện chất lượng của các dịch vụ của chúng tôi.
                            </li>
                            <li>
                              Phân tích và nghiên cứu. Chúng tôi sử dụng cookie để hiểu cách bạn tương tác với dịch vụ
                              của chúng tôi để cải thiện chất lượng của chúng tôi, và thực hiện nghiên cứu, bao gồm cả
                              việc đo lường và hiểu cách bạn sử dụng các dịch vụ của chúng tôi để cải thiện chúng.
                            </li>
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>
                          <strong>Chúng tôi sử dụng cookie ở đâu?</strong>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Chúng tôi có thể đặt cookie trên máy tính/thiết bị của bạn và nhận thông tin lưu trữ trong
                            cookie, khi bạn sử dụng hoặc truy cập vào các sản phẩm của FpolyZone
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>
                          <strong>Bạn có thể kiểm soát Thông tin của mình bằng cách nào?</strong>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Chúng tôi sử dụng cookie để cá nhân hóa và cải thiện nội dung cũng như dịch vụ, mang lại
                            trải nghiệm an toàn hơn, hiển thị cho bạn những quảng cáo hữu ích và phù hợp cả trên lẫn
                            ngoài Sản phẩm của FpolyZone. Bạn có thể dùng các công cụ được mô tả bên dưới nhằm kiểm soát
                            cách chúng tôi sử dụng dữ liệu để hiển thị cho bạn quảng cáo và nhiều nội dung khác.
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Row>
                      <Col>
                        <Accordion defaultActiveKey="1">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              <strong>Điều khoản dịch vụ</strong>
                            </Accordion.Header>
                            <Accordion.Body>
                              <p>
                                Chào mừng bạn đến với FpolyZone! Điều khoản dịch vụ này ("Điều khoản") là một thỏa thuận
                                pháp lý giữa bạn và chúng tôi, điều chỉnh việc sử dụng dịch vụ của chúng tôi. Vui lòng
                                đọc kỹ Điều khoản này trước khi sử dụng dịch vụ của chúng tôi.
                              </p>
                              <p>
                                Bằng cách truy cập hoặc sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ và bị ràng
                                buộc bởi Điều khoản này. Nếu bạn không đồng ý với các điều khoản và điều kiện này, vui
                                lòng không sử dụng dịch vụ của chúng tôi.
                              </p>
                              <p>
                                1. <strong>Quyền sở hữu trí tuệ:</strong> FpolyZone là chủ sở hữu độc quyền của tất cả
                                các quyền sở hữu trí tuệ liên quan đến dịch vụ của chúng tôi. Bạn không được sao chép,
                                sửa đổi, phân phối hoặc sử dụng bất kỳ phần nào của dịch vụ của chúng tôi mà không có sự
                                cho phép bằng văn bản từ chúng tôi.
                              </p>
                              <p>
                                2. <strong>Quyền và trách nhiệm của bạn:</strong> Bạn cam kết rằng bạn sẽ tuân thủ tất
                                cả các quy định và quy tắc liên quan đến việc sử dụng dịch vụ của chúng tôi. Bạn chịu
                                trách nhiệm về nội dung bạn đăng tải hoặc chia sẻ thông qua dịch vụ của chúng tôi, và
                                bạn đồng ý không vi phạm quyền của bất kỳ bên thứ ba nào.
                              </p>
                              <p>
                                3. <strong>Bảo mật và quyền riêng tư:</strong> Chúng tôi cam kết bảo vệ thông tin cá
                                nhân của bạn và tuân thủ các quy định về bảo mật và quyền riêng tư. Tuy nhiên, bạn cũng
                                cần hiểu rằng việc sử dụng dịch vụ của chúng tôi có thể tiếp xúc với một số thông tin cá
                                nhân. Vui lòng đọc kỹ Chính sách Bảo mật của chúng tôi để hiểu rõ hơn về cách chúng tôi
                                thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.
                              </p>
                              <p>
                                4. <strong>Giới hạn trách nhiệm:</strong> Chúng tôi không chịu trách nhiệm đối với bất
                                kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả nào phát sinh từ
                                việc sử dụng dịch vụ của chúng tôi. Bạn sử dụng dịch vụ của chúng tôi hoàn toàn có trách
                                nhiệm và chịu rủi ro riêng.
                              </p>
                              <p>
                                5. <strong>Chấm dứt:</strong> Chúng tôi có quyền chấm dứt hoặc tạm ngừng cung cấp dịch
                                vụ của chúng tôi bất cứ lúc nào mà không cần thông báo trước. Chúng tôi cũng có quyền
                                chấm dứt hoặc tạm ngừng tài khoản của bạn nếu bạn vi phạm Điều khoản này.
                              </p>
                              <p>
                                Đây chỉ là một tóm tắt ngắn gọn về Điều khoản dịch vụ của chúng tôi. Vui lòng đọc kỹ
                                Điều khoản này và Chính sách Bảo mật của chúng tôi để hiểu rõ hơn về quyền và trách
                                nhiệm của bạn khi sử dụng dịch vụ của chúng tôi.
                              </p>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>
                              <strong>Cam kết của bạn với FpolyZone và cộng đồng của chúng tôi</strong>
                            </Accordion.Header>
                            <Accordion.Body>
                              <p>
                                Chúng tôi rất trân trọng cộng đồng của chúng tôi và cam kết tạo ra một môi trường an
                                toàn, tích cực và hữu ích cho tất cả mọi người. Khi sử dụng dịch vụ của chúng tôi, bạn
                                đồng ý tuân thủ các quy tắc và nguyên tắc sau đây:
                              </p>

                              <p>
                                1. Tôn trọng và đối xử công bằng: Hãy tôn trọng quyền riêng tư, quyền lợi và quan điểm
                                của người khác. Đừng phân biệt đối xử dựa trên giới tính, tôn giáo, chủng tộc, quốc
                                tịch, tuổi tác hoặc bất kỳ yếu tố nào khác.
                              </p>

                              <p>
                                2. Không gây hại và không quấy rối: Hãy tránh việc đăng tải hoặc chia sẻ nội dung gây
                                hại, đe dọa, quấy rối, xúc phạm hoặc phản động. Đừng thực hiện hành vi quấy rối hoặc bắt
                                nạt người khác.
                              </p>

                              <p>
                                3. Bảo vệ quyền riêng tư: Hãy tôn trọng quyền riêng tư của người khác và không đăng tải
                                hoặc chia sẻ thông tin cá nhân của người khác mà không có sự cho phép.
                              </p>

                              <p>
                                4. Không vi phạm bản quyền: Hãy tuân thủ luật bản quyền và không đăng tải hoặc chia sẻ
                                nội dung vi phạm quyền sở hữu trí tuệ của người khác.
                              </p>

                              <p>
                                5. Không lạm dụng hoặc xâm phạm dịch vụ: Hãy sử dụng dịch vụ của chúng tôi một cách hợp
                                lý và không gây lạm dụng hoặc xâm phạm vào hệ thống hoặc dịch vụ của chúng tôi.
                              </p>

                              <p>
                                6. Báo cáo nội dung vi phạm: Nếu bạn phát hiện bất kỳ nội dung vi phạm hoặc hành vi
                                không đúng mực, hãy báo cáo cho chúng tôi để chúng tôi có thể xử lý và duy trì một cộng
                                đồng an toàn và lành mạnh.
                              </p>

                              <p>
                                Chúng tôi xem trọng cam kết của bạn và sẽ tiếp tục nỗ lực để duy trì một cộng đồng
                                FpolyZone tích cực và hữu ích cho tất cả mọi người. Cảm ơn bạn đã đồng hành cùng chúng
                                tôi!
                              </p>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <strong>Tránh hành vi lừa đảo và spam</strong>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Chúng tôi cam kết tạo ra một môi trường an toàn và tin cậy cho cộng đồng của chúng tôi. Vì
                            vậy, chúng tôi yêu cầu bạn tuân thủ các quy tắc sau để tránh hành vi lừa đảo và spam:
                          </p>
                          <ul>
                            <li>
                              Không thực hiện hành vi lừa đảo: Đừng tham gia vào bất kỳ hoạt động lừa đảo nào, bao gồm
                              việc gửi thông tin sai lệch, giả mạo danh tính hoặc lừa đảo người khác để lấy thông tin cá
                              nhân hoặc tài sản của họ.
                            </li>
                            <li>
                              Không gửi spam: Đừng gửi thông điệp không mong muốn hoặc không được yêu cầu đến người
                              khác. Hãy tuân thủ các quy định về quảng cáo và không gửi thông điệp quảng cáo không được
                              yêu cầu.
                            </li>
                            <li>
                              Không sử dụng thông tin cá nhân của người khác một cách trái phép: Đừng thu thập, sử dụng
                              hoặc tiết lộ thông tin cá nhân của người khác mà không có sự cho phép của họ. Hãy tuân thủ
                              các quy định về bảo vệ quyền riêng tư và không vi phạm quyền của người khác.
                            </li>
                            <li>
                              Không tạo nội dung gây nhầm lẫn hoặc đánh lừa: Đừng tạo ra nội dung gây nhầm lẫn hoặc đánh
                              lừa người khác, bao gồm việc đăng tải thông tin sai lệch, giả mạo hoặc tạo ra thông tin
                              không chính xác.
                            </li>
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </>
  );
};
