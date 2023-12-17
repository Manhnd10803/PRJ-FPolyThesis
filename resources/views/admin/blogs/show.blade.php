@extends('admin.layouts.app')
@section('title')
    Chi tiết {{ $blog->title }}
@endsection
@section('content')
    @php
        $userGroupId = auth()->user()->group_id;
        $isSPAdmin = $userGroupId == config('default.user.groupID.superAdmin') ? true : false;
        if (!$isSPAdmin) {
            $role_id = App\Models\UserRole::where('user_id', Auth::user()->id)->first()->role_id;
            if (!is_null($role_id)) {
                $userPermission = App\Models\RolePermission::getUserPermistion($role_id);
            }
        }
    @endphp
    <div class="row">
        <div class="col-md-12">
            <!-- The time line -->
            <ul class="timeline">
                <!-- timeline atime label -->
                <li class="time-label">
                    <span class="bg-red">
                        {{ $blog->created_at->format('d M. Y') }}
                    </span>
                    <span class="btn btn-aqua pull-right"><a href="/blog/{{ $blog->id }}">Xem tại phía người dùng</a></span>
                </li>
                @if ($blog->status == config('default.blog.status.reject'))
                    <li>
                        <i class="fa fa-close  bg-red"></i>

                        <div class="timeline-item">
                            <div class="callout callout-danger">
                                <h4>Đã hủy!</h4>

                                <p>Bài viết có nội dung không phù hợp hay có hành vi xúc phạm trái với quy định .</p>
                            </div>
                        </div>
                    </li>
                @endif
                <li>
                    <i class="fa fa-user bg-aqua"></i>

                    <div class="timeline-item">
                        <span class="time" style="margin-top: 6px">
                            {{ $blog->created_at }}
                        </span>
                        <h3 class="timeline-header"><a href="#"> <img src="{{ $blog->user->avatar }}"
                                    class="img-circle" width="30" height="30" alt="User Image">
                                @if ($blog->user && $blog->user->username)
                                    {{ $blog->user->username }}  
                                @else
                                    Không có người dùng
                                @endif
                            </a>
                            <span class="fw-lighter">
                                @if ($blog->major && $blog->major->majors_code)
                                    {{ $blog->major->majors_code }}
                                @else
                                @endif
                            </span>

                        </h3>

                    </div>
                </li>
                <li>
                    <i class="fa fa-book bg-light-blue"></i>

                    <div class="timeline-item">
                        <h3 class="timeline-header">
                            Nội dung
                        </h3>
                        <div class="timeline-body">
                            <h2>{{ $blog->title }}</h2>
                            {!! str_replace(['\\', '&quot;', '"', "'"], '', $blog->content) !!}
                        </div>
                        <div class="timeline-footer">

                        </div>
                    </div>
                </li>
                <li>
                    <i class="fa fa-tags bg-black"></i>
                    <div class="timeline-item">
                        <h3 class="timeline-header">
                            Hashtag
                        </h3>
                        <div class="timeline-body ">
                            {{ $blog->hashtag }}
                        </div>
                        <div class="timeline-footer">

                        </div>
                    </div>
                </li>
                <li>
                    <i class="fa fa-camera bg-purple"></i>

                    <div class="timeline-item">

                        <h3 class="timeline-header">Thumbnail</h3>

                        <div class="timeline-body" style="display: flex;justify-content: center">
                            <img src="{{ $blog->thumbnail }}" alt="..." class="margin" width="400" height="350"
                                style="border-radius: 3%">
                        </div>
                    </div>
                </li>
                @if ($blog->status == config('default.blog.status.approved'))
                    <li>
                        <i class="fa fa-heart bg-red"></i>

                        <div class="timeline-item">
                            {{-- <span class="time"><i class="fa fa-clock-o"></i> 5 mins ago</span> --}}

                            <h3 class="timeline-header no-border" style="display: flex;justify-content: center;gap: 20px">
                                <span>{{ $blog->like_count }} <i class="fa fa-thumbs-o-up"></i></span>
                                <span>{{ $blog->dislike_count }} <i class="fa fa-thumbs-o-down"></i></span>
                                <span>{{ $blog->comment_count }} <i class="fa fa-commenting-o"></i></span>
                            </h3>
                        </div>
                    </li>
                    <li>
                        <i class="fa fa-eye bg-aqua"></i>

                        <div class="timeline-item">
                            {{-- <span class="time"><i class="fa fa-clock-o"></i> 5 mins ago</span> --}}

                            <h3 class="timeline-header no-border" style="display: flex;justify-content: center;gap: 10px">
                                {{ $blog->views }} lượt xem
                            </h3>
                        </div>
                    </li>
                 
                @endif
                @if ($blog->status == config('default.blog.status.pending'))
                @if ($isSPAdmin || in_array('admin.blogs.statusApprove', $userPermission))
                    <li>
                        <span class="time">
                            <button type="submit" class="btn btn-success" data-toggle="modal"
                                data-target="#modal-danger"><i class="fa fa-check-circle"></i> Duyệt bài</button>
                            <div class="modal modal-success fade" id="modal-danger">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span></button>
                                            <h4 class="modal-title">FpolyZone</h4>
                                        </div>
                                        <div class="modal-body">
                                            <p>Bạn có chắc muốn duyệt bài blog <strong>"{{ $blog->title }}"</strong>?
                                            </p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-outline pull-left"
                                                data-dismiss="modal">Hủy</button>
                                            <form action="{{ route('admin.blogs.statusApprove', ['blog' => $blog->id]) }}"
                                                method="post" style="display: inline;">
                                                @csrf
                                                @method('PUT')
                                                <button type="submit" class="btn btn-outline">Đồng ý</button>
                                            </form>
                                        </div>
                                    </div>
                                    <!-- /.modal-content -->
                                </div>
                                <!-- /.modal-dialog -->
                            </div>
                        </span>
                    </li>
                @endif
                @if ($isSPAdmin || in_array('admin.blogs.statusReject', $userPermission))
                    <li>
                        <span class="time">
                            <button type="submit" class="btn btn-danger" data-toggle="modal"
                                data-target="#modal-danger-{{ $blog->id }}">Hủy bài viết</button>

                            <div class="modal modal-danger fade" id="modal-danger-{{ $blog->id }}">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span></button>
                                            <h4 class="modal-title">FpolyZone</h4>
                                        </div>
                                        <div class="modal-body">
                                            <p>Bạn có chắc muốn hủy bài blog <strong>"{{ $blog->title }}"</strong>?
                                            </p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-outline pull-left"
                                                data-dismiss="modal">Hủy</button>
                                            <form action="{{ route('admin.blogs.statusReject', ['blog' => $blog->id]) }}"
                                                method="post" style="display: inline;">
                                                @csrf
                                                @method('PUT')
                                                <button type="submit" class="btn btn-outline">Đồng ý</button>
                                            </form>
                                        </div>
                                    </div>
                                    <!-- /.modal-content -->
                                </div>
                                <!-- /.modal-dialog -->
                            </div>
                        </span>
                    </li>
                    @endif
                @endif
                <li>
                    <i class="fa fa-check bg-green"></i>
                </li>
        </div>
    </div>
@endsection
