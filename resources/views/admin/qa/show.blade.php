@extends('admin.layouts.app')
@section('title')
    Chi tiết {{ $qa->title }}
@endsection
@section('content')
    <div class="row">
        <div class="col-md-12">
            <ul class="timeline">
                <li class="time-label">
                    <span class="bg-red">
                        {{ $qa->created_at->format('d M. Y') }}
                    </span>
                    <span class="btn btn-aqua pull-right"><a href="/quests/{{ $qa->id }}">Xem tại phía người dùng</a></span>

                </li>
                <li>
                    <i class="fa fa-user bg-aqua"></i>
                    <div class="timeline-item">
                        <span class="time" style="margin-top: 6px">
                            <i class="fa fa-clock-o"></i> {{ $qa->created_at }}
                        </span>
                        <h3 class="timeline-header"><a href="#"> <img src="{{ $qa->user->avatar }}" class="img-circle"
                                    width="30" height="30" alt="User Image">
                                @if ($qa->user && $qa->user->username)
                                    {{ $qa->user->username }}
                                @else
                                Không có người dùng
                                @endif
                            </a>
                            <span class="fw-lighter">
                                @if ($qa->major && $qa->major->majors_name)
                                    {{ $qa->major->majors_name }}
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
                            <h2>{{ $qa->title }}</h2>
                            {!! str_replace(['"', "'"], '', $qa->content) !!}
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
                            {{ $qa->hashtag }}
                        </div>
                    </div>
                </li>
                <li>
                    <i class="fa fa-heart bg-red"></i>

                    <div class="timeline-item">
                        {{-- <span class="time"><i class="fa fa-clock-o"></i> 5 mins ago</span> --}}

                        <h3 class="timeline-header no-border" style="display: flex;justify-content: center;gap: 20px">
                            <span>{{ $qa->like_count }} <i class="fa fa-thumbs-o-up"></i></span>
                            <span>{{ $qa->dislike_count }} <i class="fa fa-thumbs-o-down"></i></span>
                            <span>{{ $qa->comment_count }} <i class="fa fa-commenting-o"></i></span>
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
                            {{ $qa->views }} lượt xem
                        </h3>
                    </div>
                </li>
                <li>
                    <i class="fa fa-check bg-green"></i>
                </li>

        </div>
    </div>
@endsection
