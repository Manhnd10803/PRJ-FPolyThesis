@extends('admin.layouts.app')
@section('title')
    Dashboard
@endsection
@section('content')
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            Dashboard
            {{-- <small>Control panel</small> --}}
        </h1>
    </section>

    <!-- Main content -->
    <section class="content">
        <!-- Small boxes (Stat box) -->
        <div class="row">
            <div class="col-lg-3 col-xs-6">
                <!-- small box -->
                <div class="small-box bg-aqua">
                    <div class="inner">
                        @php
                            $countUsers = App\Models\User::count();
                        @endphp
                        <h3>{{ $countUsers }}</h3>
                        <p>Người sử dụng hệ thống</p>
                    </div>
                    <div class="icon">
                        <i class="fa fa-fw fa-users"></i>
                    </div>
                    <a href="{{ route('admin.users.list') }}" class="small-box-footer">Xem danh sách <i
                            class="fa fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-xs-6">
                <!-- small box -->
                <div class="small-box bg-green">
                    <div class="inner">
                        @php
                            $countBlogs = App\Models\Blog::where('status', 0)->count();
                        @endphp
                        <h3>{{ $countBlogs }}</h3>

                        <p>Blog đang chờ duyệt</p>
                    </div>
                    <div class="icon">
                        <i class="fa fa-fw fa-newspaper-o"></i>
                    </div>
                    <a href="{{ route('admin.blogs.approve') }}" class="small-box-footer">Xem danh sách <i
                            class="fa fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-xs-6">
                <!-- small box -->
                <div class="small-box bg-yellow">
                    <div class="inner">
                        @php
                            $countAdmin = App\Models\User::where('group_id', 2)->count();
                        @endphp
                        <h3>{{ $countAdmin }}</h3>
                        <p>Nhân viên quản trị</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-person-add"></i>
                    </div>
                    <a href="{{ route('admin.members.list') }}" class="small-box-footer">Xem danh sách <i
                            class="fa fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-xs-6">
                <!-- small box -->
                <div class="small-box bg-red">
                    <div class="inner">
                        @php
                            $countReport = App\Models\Report::where('report_status', 'pending')->count();
                        @endphp
                        <h3>{{ $countReport }}</h3>
                        <p>Báo cáo vi phạm mới</p>
                    </div>
                    <div class="icon">
                        <i class="fa fa-fw fa-warning"></i>
                    </div>
                    <a href="{{ route('admin.report.pending') }}" class="small-box-footer">Xem danh sách <i
                            class="fa fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
        </div>
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
            <!-- Left col -->
            <section class="col-lg-7 connectedSortable">
                <!-- Chart Người dùng-->
                <div class="nav-tabs-custom">
                    <!-- Tabs within a box -->
                    <ul class="nav nav-tabs pull-right">
                        <li class="active"><a href="#revenue-chart" data-toggle="tab">
                                <select id="time-range" class="form-control">
                                    <option value="">--Chọn Thời gian--</option>
                                    <option value="7">7 ngày trước</option>
                                    <option value="30">30 ngày trước</option>
                                    <option value="90">90 ngày trước</option>
                                </select>
                            
                            </a></li>
                        <li class="pull-left header"><i class="fa fa-inbox"></i> Người dùng</li>
                    </ul>
                    <div class="tab-content no-padding">
                        <!-- Morris chart - Sales -->
                        <div class="chart tab-pane active" id="revenue-chart" style="position: relative; height: 300px;">
                        </div>
                        <div class="chart tab-pane" id="sales-chart" style="position: relative; height: 300px;"></div>
                    </div>
                </div>
                <!-- Người dùng theo ngành-->
                @php
                    $majors = App\Models\Major::all();
                    $countAllUser = count(
                        App\Models\User::where('status', 1)
                            ->where('group_id', '<>', 1)
                            ->get(),
                    );
                @endphp
                <div class="box-footer text-black">
                    <div class="row">
                        @foreach ($majors as $major)
                            <div class="col-sm-6">
                                <div class="clearfix">
                                    <span class="pull-left">{{ $major->majors_name }}</span>
                                    @php
                                        $countUsers = count(
                                            App\Models\User::where('status', 1)
                                                ->where('group_id', '<>', 1)
                                                ->where('major_id', $major->id)
                                                ->get(),
                                        );
                                    @endphp
                                    <small class="pull-right">{{ round(($countUsers / $countAllUser) * 100) }}%</small>
                                </div>
                                <div class="progress xs">
                                    <div class="progress-bar progress-bar-green"
                                        style="width: {{ round(($countUsers / $countAllUser) * 100) }}%;"></div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <!-- /.row -->
                </div>
            </section>
            <!-- /.Left col -->
            <!-- right col (We are only adding the ID to make the widgets sortable)-->
            <section class="col-lg-5 connectedSortable">
                <!-- 8 Người dùng mới nhất-->
                <div class="box box-danger">
                    <div class="box-header with-border">
                        <h3 class="box-title">Người dùng mới nhất</h3>
                        <div class="box-tools pull-right">
                            <span class="label label-danger">8 Người dùng mới</span>
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i
                                    class="fa fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.box-header -->
                    @php
                        $newUsers = App\Models\User::where('status', 1)
                            ->where('group_id', '<>', 1)
                            ->orderByDesc('id')
                            ->limit(8)
                            ->get();
                    @endphp
                    <div class="box-body no-padding">
                        <ul class="users-list clearfix">
                            @foreach ($newUsers as $newUser)
                                <li>
                                    <img src="{{ $newUser->avatar }}" alt="User Image" width="73" height="73">
                                    <a class="users-list-name"
                                        href="/profile/{{ $newUser->id }}">{{ $newUser->username }}</a>
                                    <span class="users-list-date">{{ $newUser->created_at }}</span>
                                </li>
                            @endforeach
                        </ul>
                        <!-- /.users-list -->
                    </div>
                    <!-- /.box-body -->
                    <div class="box-footer text-center">
                        <a href="{{ route('admin.users.list') }}" class="uppercase">Xem tất cả</a>
                    </div>
                    <!-- /.box-footer -->
                </div>
                <!-- Số lượng blog, qa, post-->
                <div class="info-box bg-aqua">
                    <span class="info-box-icon"><i class="fa fa-fw fa-newspaper-o"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">Tổng số Bài viết</span>
                        @php
                            $countBlog = count(App\Models\Blog::where('status', 1)->get());
                            $startDate = now()->subWeeks(1);
                            $countBlog7DaysAgo = count(
                                App\Models\Blog::where('created_at', '<=', $startDate)
                                    ->where('status', 1)
                                    ->get(),
                            );
                            $percentIncreaseBlog = $countBlog7DaysAgo > 0 ? (($countBlog - $countBlog7DaysAgo) / $countBlog) * 100 : 0;
                        @endphp
                        <span class="info-box-number">{{ $countBlog }}</span>
                        <div class="progress">
                            <div class="progress-bar" style="width: {{ $percentIncreaseBlog }}%"></div>
                        </div>
                        <span class="progress-description">
                            Tăng {{ number_format($percentIncreaseBlog, 0) }}% trong 7 ngày
                        </span>
                    </div>
                </div>
                <div class="info-box bg-yellow">
                    <span class="info-box-icon"><i class="fa fa-fw fa-book"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">Tổng số Bài đăng</span>
                        @php
                            $countPost = count(App\Models\Post::get());
                            $startDate = now()->subWeeks(1);
                            $countPost7DaysAgo = count(App\Models\Post::where('created_at', '<=', $startDate)->get());
                            $percentIncreasePost = $countPost7DaysAgo > 0 ? (($countPost - $countPost7DaysAgo) / $countPost) * 100 : 0;
                        @endphp
                        <span class="info-box-number">{{ $countPost }}</span>
                        <div class="progress">
                            <div class="progress-bar" style="width: {{ $percentIncreasePost }}%"></div>
                        </div>
                        <span class="progress-description">
                            Tăng {{ number_format($percentIncreasePost, 0) }}% trong 7 ngày
                        </span>
                    </div>
                </div>
                <div class="info-box bg-green">
                    <span class="info-box-icon"><i class="fa fa-fw fa-question"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">Tổng số Câu hỏi</span>
                        @php
                            $countQa = count(App\Models\Qa::get());
                            $startDate = now()->subWeeks(1);
                            $countQa7DaysAgo = count(App\Models\Qa::where('created_at', '<=', $startDate)->get());
                            $percentIncreaseQa = $countQa7DaysAgo > 0 ? (($countQa - $countQa7DaysAgo) / $countQa) * 100 : 0;
                        @endphp
                        <span class="info-box-number">{{ $countQa }}</span>
                        <div class="progress">
                            <div class="progress-bar" style="width: {{ $percentIncreaseQa }}%"></div>
                        </div>
                        <span class="progress-description">
                            Tăng {{ number_format($percentIncreaseQa, 0) }}% trong 7 ngày
                        </span>
                    </div>
                </div>
        </div>
        <!-- /.box -->
    </section>
    <!-- right col -->
    </div>
    <!-- /.row (main row) -->
    </section>
    <!-- /.content -->
@endsection
