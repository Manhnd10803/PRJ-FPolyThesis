<aside class="main-sidebar">
  <!-- sidebar: style can be found in sidebar.less -->
  <section class="sidebar">
    <!-- Sidebar user panel -->
    <div class="user-panel">
      <div class="pull-left image">
        <img src="{{ asset('dist/img/admin-male.png') }}" class="img-circle" alt="User Image">
      </div>
      <div class="pull-left info">
        <p>{{ Auth::user()->username }}</p>
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
  @php 
      // $userPermistion = App\Models\UserRole::getPermissions(auth()->user()->id);
      $userGroupId = auth()->user()->group_id;
      $isSPAdmin = $userGroupId == config('default.user.groupID.superAdmin') ? true : false;
  @endphp
  @if (isset($backend_menus) && !empty($backend_menus))
      @foreach ($backend_menus as $menu_lv1)
        @php
            $currentRouteName = request()->route()->getName();
            $checkSubMenu = (isset($menu_lv1['sub']) && !empty($menu_lv1['sub'])) ? true : false;
            $active = false;
            if(!$checkSubMenu) {
                if($currentRouteName == $menu_lv1['route']){
                    $active = true;
                }
            }else {
                foreach ($menu_lv1['sub'] as $menu_lv2){
                    if($currentRouteName == $menu_lv2['route']) {
                        $active = true;
                    }
                }
            }
        @endphp
        @if ($isSPAdmin || in_array($menu_lv1['permission'], $userPermistion))
          <li class="{{ $checkSubMenu ? 'treeview' : '' }} {{ $active ? 'active' : ''}}">
            <a href="{{ $checkSubMenu ? '#' : route($menu_lv1['route']) }}">
              <i class="{{ $menu_lv1['icon'] }}"></i> <span>{{ $menu_lv1['text']  }}</span>
              @if ($checkSubMenu)
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              @endif
            </a>
            @if ($checkSubMenu)
              <ul class="treeview-menu">
                @foreach ($menu_lv1['sub'] as $menu_lv2)
                    @if($isSPAdmin || in_array($menu_lv2['permission'], $userPermistion))
                      @php 
                          if($currentRouteName == $menu_lv2['route']){
                              $active = true;
                          }else {
                              $active = false;
                          }
                      @endphp
                      @if (isset($menu_lv2['count']))
                        <li class="{{ $active ? 'active' : ''}}"><a href="{{ route($menu_lv2['route']) }}"><i class="fa fa-circle-o"></i><span>{{ $menu_lv2['text'] }}</span>
                          <span class="pull-right-container">
                            <span class="label label-primary pull-right" id="pendingBlogsCount">...</span>
                          </span></a> </li>
                      @else
                        <li class="{{ $active ? 'active' : ''}}"><a href="{{ route($menu_lv2['route']) }}"><i class="fa fa-circle-o"></i>{{ $menu_lv2['text'] }}</a></li>
                      @endif
                    @endif
                @endforeach
              </ul>
            @endif
          </li>
        @endif
      @endforeach
  @endif
</ul>
</section>
<!-- /.sidebar -->
</aside>