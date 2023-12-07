@extends('admin.layouts.app')
@section('title')
    Chi tiết {{ $post->id }}
@endsection
@section('content')
    <div class="row">
        <div class="col-md-12">
            <ul class="timeline">
                <li class="time-label">
                    <span class="bg-red">
                        {{ $post->created_at->format('d M. Y') }}
                    </span>
                    {{-- <span class="btn btn-aqua pull-right"><a href="/qa/{{ $post->id }}">Xem tại phía người dùng</a></span> --}}
                </li>
                <li>
                    <i class="fa fa-user bg-aqua"></i>
                    <div class="timeline-item">
                        <span class="time" style="margin-top: 6px">
                            <i class="fa fa-clock-o"></i> {{ $post->created_at }}
                        </span>
                        <h3 class="timeline-header"><a href="#"> <img src="{{ $post->user->avatar }}"
                                    class="img-circle" width="30" height="30" alt="User Image">
                                @if ($post->user && $post->user->username)
                                    {{ $post->user->username }}
                                @else
                                    Không có người dùng
                                @endif
                            </a>
                            <span class="fw-lighter">
                                @if ($post->user->major && $post->user->major->majors_name)
                                    {{ $post->user->major->majors_name }}
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
                        <div class="timeline-body ">
                            {{ $post->content }}
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
                            {{ $post->hashtag }}
                        </div>
                    </div>
                </li>
                <li>
                    <i class="fa fa-camera bg-purple"></i>
                    <div class="timeline-item">
                        <h3 class="timeline-header">Hình ảnh đăng lên</h3>
                        <div class="timeline-body" style="display: flex;justify-content: center">
                            @foreach (json_decode($post->image) as $item)
                            
                                    <img src="{{ $item }}" alt="..." class="margin" width="150"
                                        height="150" style="border-radius: 3%">
                                
                            @endforeach
                        </div>
                    </div>
                </li>
                <li>
                    <i class="fa fa-heart bg-red"></i>

                    <div class="timeline-item">
                        {{-- <span class="time"><i class="fa fa-clock-o"></i> 5 mins ago</span> --}}

                        <h3 class="timeline-header no-border" style="display: flex;justify-content: center;gap: 20px">
                            <span>{{ $post->like_count }} <i class="fa fa-thumbs-o-up"></i></span>
                            <span>{{ $post->dislike_count }} <i class="fa fa-thumbs-o-down"></i></span>
                            <span>{{ $post->comment_count }} <i class="fa fa-commenting-o"></i></span>
                        </h3>
                    </div>
                </li>
                {{-- <li>
                    <i class="fa  fa-comments bg-yellow"></i>
                    <div class="timeline-item">
                        <h3 class="timeline-header no-border" style="display: flex;justify-content: center;gap: 10px">
                            {{ $commentCount }} comments
                        </h3>
                    </div>
                </li> --}}
                <li>
                    <i class="fa fa-eye bg-aqua"></i>

                    <div class="timeline-item">
                        <h3 class="timeline-header no-border" style="display: flex;justify-content: center;gap: 10px">
                            {{ $post->views }} lượt xem
                        </h3>
                    </div>
                </li>
                <li>
                    <i class="fa fa-check bg-green"></i>
                </li>

        </div>
    </div>
@endsection
