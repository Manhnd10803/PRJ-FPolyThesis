<aside class="main-sidebar">
  <!-- sidebar: style can be found in sidebar.less -->
  <section class="sidebar">
    <!-- Sidebar user panel -->
    <div class="user-panel">
      <div class="pull-left image">
        <img src="{{ asset('dist/img/user2-160x160.jpg') }}" class="img-circle" alt="User Image">
      </div>
      <div class="pull-left info">
        <p>Alexander Pierce</p>
        <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
      </div>
    </div>
    <!-- search form -->
    <form action="#" method="get" class="sidebar-form">
      <div class="input-group">
        <input type="text" name="q" class="form-control" placeholder="Search...">
        <span class="input-group-btn">
          <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
          </button>
        </span>
      </div>
    </form>
<ul class="sidebar-menu" data-widget="tree">
  <li class="header">MAIN NAVIGATION</li>
  <li class="treeview">
    <a href="#">
      <i class="fa fa-dashboard"></i> <span>Dashboard</span>
      <span class="pull-right-container">
        <i class="fa fa-angle-left pull-right"></i>
      </span>
    </a>
    <ul class="treeview-menu">
      <li><a href="{{ route('dashboard') }}"><i class="fa fa-circle-o"></i> Dashboard</a></li>
    </ul>
  </li>
  <li class="treeview">
    <a href="#">
      <i class="fa  fa-book"></i> <span>Blog</span>
      <span class="pull-right-container">
        <i class="fa fa-angle-left pull-right"></i>
      </span>
    </a>
    <ul class="treeview-menu">
      <li><a href="{{ route('admin.blogs.index') }}"><i class="fa fa-circle-o"></i>Danh sách blog</a></li>
      <li><a href="{{ route('admin.blogs.approve') }}"><i class="fa fa-circle-o"></i><span>Chờ duyệt</span>
        <span class="pull-right-container">
          <span class="label label-primary pull-right" id="pendingBlogsCount">...</span>
        </span></a> </li>
    </ul>
  </li>
  <li>
    <a href="{{ route('admin.users.index') }}">
      <i class="fa  fa-users"></i> <span>Danh sách người dùng</span>
    </a>
  </li>
  <li>
    <a href="{{ route('admin.posts.index') }}">
      <i class="fa fa-calendar-check-o"></i> <span>Danh sách bài post</span>
    </a>
  </li>
  <li>
    <a href="{{ route('admin.qa.index') }}">
      <i class="fa  fa-question"></i> <span>Danh sách câu hỏi</span>
    </a>
  </li>
  <li>
    <a href="{{ route('admin.majors.index') }}">
      <i class="fa  fa-briefcase"></i> <span>Danh sách chuyên ngành</span>
    </a>
  </li>
</ul>
</section>
<!-- /.sidebar -->
</aside>