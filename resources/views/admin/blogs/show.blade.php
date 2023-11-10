@extends('admin.layouts.app')
@section('title')
    Dashboard
@endsection
@section('content')
    <div class="row">
        <div class="col-md-12">
            <!-- The time line -->
            <ul class="timeline">
                <!-- timeline time label -->
                <li class="time-label">
                    <span class="bg-red">
                        {{ $blog->created_at->format('d M. Y') }}
                    </span>

                </li>
                <li>
                    <i class="fa fa-eye bg-light-blue"></i>

                    <div class="timeline-item">
                        @if ($blog->status == config('default.blog.status.reject'))
                            <div class="callout callout-warning">
                                <h4>Đã hủy!</h4>

                                <p>Bài viết có nội dung không phù hợp hay có hành vi xúc phạm trái với quy định .</p>
                            </div>
                        @endif
                        <span class="time" >
                            @if ($blog->status == config('default.blog.status.pending'))
                                <button type="submit" class="btn btn-success" data-toggle="modal"
                                    data-target="#modal-danger"><i class="fa fa-check-circle"></i> Bài viết được thông
                                    qua</button>

                                <div class="modal modal-success fade" id="modal-danger">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal"
                                                    aria-label="Close">
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
                                                <form
                                                    action="{{ route('admin.blogs.statusApprove', ['blog' => $blog->id]) }}"
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
                            @endif
                        </span>
                        <h3 class="timeline-header"><a href="#"> <img src="{{ $blog->user->avatar }}"
                                    class="img-circle" width="30" alt="User Image"> {{ $blog->user->username }}</a>
                            <span class="fw-lighter">
                                < {{ $blog->major->majors_name }}>
                            </span>
                            {{ $blog->created_at }}
                        </h3>

                        <div class="timeline-body">
                            <h2>{{ $blog->title }}</h2>
                            {{ $blog->content }}
                        </div>
                        <div class="timeline-footer">
                            @if ($blog->status == config('default.blog.status.approved'))
                                <div style="border-top: 0.5px solid;display: flex;gap: 10px;padding: 10px">
                                    <span>{{ $blog->like_count }} <i class="fa fa-thumbs-o-up"></i></span>
                                    <span>{{ $blog->dislike_count }} <i class="fa fa-thumbs-o-down"></i></span>
                                    <span>{{ $blog->comment_count }} <i class="fa fa-commenting-o"></i></span>
                                </div>
                            @endif
                            @if ($blog->status == config('default.blog.status.pending'))
                                <button type="submit" class="btn btn-warning" data-toggle="modal"
                                    data-target="#modal-warning">Hủy bài viết</button>

                                <div class="modal modal-warning fade" id="modal-warning">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal"
                                                    aria-label="Close">
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
                                                <form
                                                    action="{{ route('admin.blogs.statusReject', ['blog' => $blog->id]) }}"
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
                            @endif


                        </div>
                    </div>
                </li>
        </div>
    </div>
@endsection
