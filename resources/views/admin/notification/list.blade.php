@extends('admin.layouts.app')
@section('title') Thông báo @endsection
@section('content')
<section class="content-header">
  <h1>
    Danh sách thông báo
  </h1>
</section>
<section class="content">
  <!-- row -->
  <div class="row">
    <div class="col-md-12">
      <!-- The time line -->
      <ul class="timeline">
        <!-- timeline time label -->
        @foreach ($dates as $date)
        <li class="time-label">
              <span class="bg-green">
                {{ $date->date }}
              </span>
        </li>
        <!-- /.timeline-label -->
        <!-- timeline item -->
          @php
            $notifications = App\Models\Notification::where('recipient', $idAdmin)->whereDate('created_at', $date->date)->orderByDesc('id')->get();
          @endphp
          @foreach ($notifications as $notification)
            <li>
                <img src="{{ $notification->user->avatar }}" alt="" width="30" height="30" style="border-radius: 100%; margin-left: 18px">
                <div class="timeline-item" @if ($notification->status == '1') style="background-color: #d2d6de" @endif>
                    <span class="time"><i class="fa fa-clock-o"></i> {{ \Carbon\Carbon::parse($notification->created_at)->format('H:i:s') }}</span>
                    <h3 class="timeline-header">{{ $notification->content }}</h3>
                    <div class="timeline-footer">
                        <a class="btn btn-primary btn-xs" href="{{ route('admin.see-notification', $notification->id) }}">Xem chi tiết</a>
                        <a class="btn btn-danger btn-xs">Xóa</a>
                    </div>
                </div>
            </li>
          @endforeach
        @endforeach
        <li>
          <i class="fa fa-clock-o bg-gray"></i>
        </li>
      </ul>
    </div>
    <!-- /.col -->
  </div>
  <!-- /.row -->
</section>
@endsection