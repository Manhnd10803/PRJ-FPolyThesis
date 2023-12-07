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
            
            <div class="col-lg-12" style="background-color:white; boder-radius:10px;">
              <div class="card-block card-stretch card-height blog blog-detail" style="margin: 25px">
                  <div class="card-body">
                      <div class="blog-description mt-3">
                          <div class="d-flex align-items-center justify-content-between" style="display:flex; align-item: center; justify-content:space-between;">
                              <div class="d-flex align-items-center" style="display:flex; align-item: center; ">
                                  <div class="user-image mb-3"  style="margin-right:25px ">
                                      <img class="avatar-80 rounded" height="80px" width="80px"  style="border-radius: 50%" src="{{ $blog->user->avatar }}" alt="Ảnh đại diện">
                                  </div>
                                  <div class="ms-3" style="margin-left: 1rem; ">
                                      {{-- <a href="{{ route('profile', ['id' => $data['blog']['user']['id']]) }}"> --}}
                                          <div class="d-flex gap-2 align-items-center" style="display:flex; align-item: center; ">
                                              <h3>
                                                @if ($blog->user)
                                                    {{ $blog->user->first_name }} {{ $blog->user->last_name }}
                                                @else
                                                    Không có người dùng
                                                @endif
                                              </h3>
                                              {{-- <div class="d-flex gap-1 align-items-center" style="display:flex; align-item: center; ">
                                                  <i class="material-symbols-outlined pe-2 md-18 text-primary" >stars</i>
                                                  <div>{{ $blog->user->score }}</div>
                                              </div> --}}
                                          </div>
                                          <p class="text-black">
                                            @if ($blog->major && $blog->major->majors_name)
                                                {{ $blog->major->majors_name }}
                                            @else
                                            @endif
                                          </p>
                                      {{-- </a> --}}
                                  </div>
                              </div>
                          </div>
                          <div class="blog-meta d-flex align-items-center gap-4 mb-3 position-right-side flex-wrap">
                              <div class="date date d-flex align-items-center" style="display:flex; align-item: center; margin-top: 20px; ">
                                  {{-- <i class="material-symbols-outlined pe-2 md-18 text-primary">calendar_month</i> --}}
                                  Đă đăng vào {{ $blog->created_at }}
                              </div>
                              {{-- <div class="btn-group" role="group" aria-label="Basic example">
                                  <button class="btn btn-light d-flex align-items-center gap-2" onclick="handleLikeClick()">
                                      @if($likeStatus === 'like')
                                          <i class="text-primary material-icons" style="font-size: 20px;">thumb_up</i>
                                      @else
                                          <i class="text-primary material-icons" style="font-size: 20px;">thumb_up_outlined</i>
                                      @endif
                                      <span class="badge bg-primary text-white ml-2">{{ $data['emotion']['like'] ?? '0' }}</span>
                                  </button>
                                  <button class="btn btn-light d-flex align-items-center" onclick="handleDislikeClick()">
                                      @if($likeStatus === 'dislike')
                                          <i class="text-primary material-icons" style="font-size: 20px;">thumb_down</i>
                                      @else
                                          <i class="text-primary material-icons" style="font-size: 20px;">thumb_down_off_alt_outlined</i>
                                      @endif
                                  </button>
                              </div> --}}
                              {{-- <a href="#" class="d-flex align-items-center cursor-pointer" onclick="scrollToComment()">
                                  <i class="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>
                                  {{ $data['total_comments'] }} comments
                              </a> --}}
                              {{-- <div class="bg-soft-primary rounded p-2 pointer text-center p-0">
                                  <div class="card-header-toolbar d-flex align-items-center">
                                      <div class="dropdown">
                                          <button class="btn material-symbols-outlined" style="cursor: pointer;" data-bs-toggle="dropdown">
                                              more_horiz
                                          </button>
                                          <div class="dropdown-menu dropdown-menu-right">
                                              @if($idUser !== $data['blog']['user']['id'])
                                                  <a class="dropdown-item" href="#" onclick="handleShowModalReport()">
                                                      <span class="material-symbols-outlined">report</span>Tìm hỗ trợ hoặc báo cáo
                                                  </a>
                                              @endif
                                              @if($idUser == $data['blog']['user']['id'])
                                                  <a class="dropdown-item" href="#" onclick="handleDelete()">
                                                      <span class="material-symbols-outlined">delete</span>Xóa bài viết hiện tại
                                                  </a>
                                              @endif
                                          </div>
                                      </div>
                                      <div class="modal" tabindex="-1" role="dialog" style="display: none;">
                                          <!-- Modal content here -->
                                      </div>
                                  </div>
                              </div> --}}
                          </div>
                          <h2 class="mb-3 pb-3 border-bottom" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #dee2e6;">{{ $blog->title }}</h2>
                          <p>{!! $blog->content ? json_decode($blog->content) : '' !!}</p>
                      </div>
                  </div>
              </div>
            </div>
          
        </div>
    </div>
@endsection
