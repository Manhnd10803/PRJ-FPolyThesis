<!-- Logo -->
<a href="{{ route('admin.dashboard') }}" class="logo">
  <!-- mini logo for sidebar mini 50x50 pixels -->
  <span class="logo-mini"><b>FPL</b>Z</span>
  <!-- logo for regular state and mobile devices -->
  <span class="logo-lg"><b>FpolyZone </b>Admin</span>
</a>
<!-- Header Navbar: style can be found in header.less -->
<nav class="navbar navbar-static-top">
  <!-- Sidebar toggle button-->
  <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
    <span class="sr-only">Toggle navigation</span>
  </a>

  <div class="navbar-custom-menu">
    <ul class="nav navbar-nav">
      @php
          $id = App\Models\User::where('email', 'admin@gmail.com')->first()->id;
          $notiNews = App\Models\Notification::where('recipient', $id)->where('status', 0)->get();
          $countNewNoti = count($notiNews);
      @endphp
      <li class="dropdown notifications-menu">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
          <i class="fa fa-bell-o"></i>
          <span class="label label-danger" id="count-noti">{{ $countNewNoti }}</span>
        </a>
        <ul class="dropdown-menu">
          <li class="header">Thông báo mới</li>
          <li>
            <!-- inner menu: contains the actual data -->
            <audio id="notificationSound">
              <source src="{{ asset('sounds/notification-admin.mp3') }}" type="audio/mp3">
            </audio>
            <script>
                document.addEventListener('DOMContentLoaded', function () {
                  const messagesList = document.getElementById('messages-list');
                  const notificationSound = document.getElementById('notificationSound');
                  Echo.channel('notification-admin')
                      .listen('NotificationAdminEvent', (data) => {
                          console.log(data)
                          // nội dung thông báo mới
                          const newNotificationLi = document.createElement('li');
                          newNotificationLi.innerHTML = `
                              <a href="/admin/see-notification/${data.notification.id}">
                                <img src="${data.avatar_sender}" alt="" width="35" height="35" style="border-radius: 100%"> ${data.notification.content}
                              </a>
                          `;
                          const notificationList = document.getElementById('list-noti');
                          notificationList.insertBefore(newNotificationLi, notificationList.firstChild);
                          //thay đổi số lượng
                          const countElement = document.getElementById('count-noti');
                          let currentCount = parseInt(countElement.innerText);
                          currentCount += 1;
                          countElement.innerText = currentCount;
                          //âm thanh thông báo
                          notificationSound.play();
                      });
              });
            </script>
              <ul class="menu" id="list-noti">
                @foreach ($notiNews as $noti)
                  <li>
                    <a href="{{ route('admin.see-notification', $noti->id) }}">
                      <img src="{{ $noti->user->avatar }}" alt="" width="35" height="35" style="border-radius: 100%"> {{ $noti->content }}
                    </a>
                  </li>
                @endforeach
              </ul>
          </li>
          <li class="footer"><a href="{{ route('admin.list-notification') }}">Xem tất cả</a></li>
        </ul>
      </li>
      <!-- User Account: style can be found in dropdown.less -->
      <li class="dropdown user user-menu">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
          <span class="hidden-xs">{{ Auth::user()->username }}</span>
        </a>
        <ul class="dropdown-menu">
          <!-- User image -->
          <li class="user-header">
            <img src="{{ asset('dist/img/admin-male.png') }}" class="img-circle" alt="User Image">
            @php
                if (Auth::user()->group_id == 1) {
                  $group = '';
                } else {
                  $group = \App\Models\UserRole::where('user_id', Auth::user()->id)->first()->role->name;
                };
            @endphp
            <p>
              {{ Auth::user()->username }} - {{ $group }}
              <small>Member since {{ Auth::user()->created_at }}</small>
            </p>
          </li>
          <!-- Menu Body -->
          {{-- <li class="user-body">
            <div class="row">
              <div class="col-xs-4 text-center">
                <a href="#">Followers</a>
              </div>
              <div class="col-xs-4 text-center">
                <a href="#">Sales</a>
              </div>
              <div class="col-xs-4 text-center">
                <a href="#">Friends</a>
              </div>
            </div>
            <!-- /.row -->
          </li> --}}
          <!-- Menu Footer-->
          <li class="user-footer">
            <div class="pull-left">
              <a href="#" class="btn btn-default btn-flat">Change password</a>
            </div>
            <div class="pull-right">
              <a href="{{ route('admin.logout') }}" class="btn btn-default btn-flat">Sign out</a>
            </div>
          </li>
        </ul>
      </li>
      <!-- Control Sidebar Toggle Button -->
      {{-- <li>
        <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
      </li> --}}
    </ul>
  </div>
</nav>