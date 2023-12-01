<?php
return [
  'dashboard' => [
    'order' => 1,
    'text'       => 'Dashboard',
    'permission' => 'admin.dashboard',
    'route' => 'admin.dashboard',
    'icon' => 'fa fa-fw fa-dashboard',
  ],
  'user' => [
    'order' => 2,
    'text'       => 'Quản lý User',
    'permission' => 'admin.users',
    'icon' => 'fa fa-fw fa-users',
    'sub'        => [
      'list_user' => [
        'order' => 1,
        'route' => 'admin.users.list',
        'permission' => 'admin.users.list',
        'sub_permission' => [
          [
            'name' => 'Khóa người dùng',
            'permission' => 'admin.users.lock'
          ],
          [
            'name' => 'Mở khóa người dùng',
            'permission' => 'admin.users.unlock'
          ],
        ],

        'text' => 'Danh sách người dùng',
      ],
    ]
  ],
  'admin' => [
    'order' => 3,
    'text'       => 'Quản lý Thành viên',
    'permission' => 'admin.admins',
    'icon' => 'fa fa-fw fa-sitemap',
    'sub'        => [
      'list_group_admin' => [
        'order' => 1,
        'route' => 'admin.groups.list',
        'permission' => 'admin.groups.list',
        'icon' => 'fa-sitemap',
        'text' => 'Nhóm quản trị',
        'sub_permission' => [
          [
            'name' => 'Thêm nhóm',
            'permission' => 'admin.groups.create'
          ],
          [
            'name' => 'Sửa nhóm',
            'permission' => 'admin.groups.edit'
          ],
          [
            'name' => 'Xóa nhóm',
            'permission' => 'admin.groups.destroy'
          ],
        ],
      ],
      'list_admin' => [
        'order' => 2,
        'route' => 'admin.members.list',
        'permission' => 'admin.members.list',
        'sub_permission' => [
          [
            'name' => 'Thêm thành viên',
            'permission' => 'admin.members.create'
          ],
          [
            'name' => 'Sửa thành viên',
            'permission' => 'admin.members.edit'
          ],
          [
            'name' => 'Khóa thành viên',
            'permission' => 'admin.members.lock'
          ],
        ],
        'icon' => 'fa fa-circle-o',
        'text' => 'Danh sách quản trị',
      ],
    ]
  ],
  'blog' => [
    'order' => 5,
    'text'       => 'Quản lý Blog',
    'permission' => 'admin.blogs',
    'icon' => 'fa fa-fw fa-newspaper-o',
    'sub'        => [
      'list_blog' => [
        'order' => 1,
        'route' => 'admin.blogs.index',
        'permission' => 'admin.blogs.index',
        'sub_permission' => [
          [
            'name' => 'Xóa blog',
            'permission' => 'admin.blogs.destroy'
          ],
        ],
        'icon' => 'fa fa-circle-o',
        'text' => 'Danh sách blog',
      ],
      'list_blog_approval' => [
        'order' => 2,
        'route' => 'admin.blogs.approve',
        'permission' => 'admin.blogs.approve',
        'count' => true,
        'sub_permission' => [
          [
            'name' => 'Duyệt blog',
            'permission' => 'admin.blogs.statusApprove'
          ],
          [
            'name' => 'Hủy blog',
            'permission' => 'admin.blogs.statusReject'
          ],
        ],
        'icon' => 'fa fa-circle-o',
        'text' => 'Chờ duyệt',
      ],
    ]
  ],
  'major' => [
    'order' => 4,
    'text'       => 'Quản lý chuyên ngành',
    'permission' => 'admin.majors',
    'icon' => 'fa fa-fw fa-briefcase',
    'sub'        => [
      'list_majors' => [
        'order' => 1,
        'route' => 'admin.majors.index',
        'permission' => 'admin.majors.index',
        'sub_permission' => [
          [
            'name' => 'Thêm chuyên ngành',
            'permission' => 'admin.majors.create'
          ],
          [
            'name' => 'Chỉnh sửa chuyên ngành',
            'icon' => 'fa fa-edit',
            'permission' => 'admin.majors.edit'
          ],
          [
            'name' => 'Xóa chuyên ngành',
            'icon' => 'fa fa-trash-o',
            'permission' => 'admin.majors.destroy'
          ],
        ],

        'text' => 'Danh sách chuyên ngành',
      ],
    ]
  ],
  'post' => [
    'order' => 6,
    'text'       => 'Quản lý bài post',
    'permission' => 'admin.posts',
    'icon' => 'fa fa-fw fa-book',
    'sub'        => [
      'list_posts' => [
        'order' => 1,
        'route' => 'admin.posts.index',
        'permission' => 'admin.posts.index',
        'text' => 'Danh sách bài post',
      ],
    ]
  ],
  'question_answers' => [
    'order' => 7,
    'text'       => 'Quản lý câu hỏi',
    'permission' => 'admin.qa',
    'icon' => 'fa fa-fw fa-question',
    'sub'        => [
      'list_question_answers' => [
        'order' => 1,
        'route' => 'admin.qa.index',
        'permission' => 'admin.qa.index',
        'sub_permission' => [
          [
            'name' => 'Xóa câu hỏi',
            'icon' => 'fa fa-trash-o',
            'permission' => 'admin.qa.destroy'
          ],
        ],
        'text' => 'Danh sách câu hỏi',
      ],
    ]
  ],
  'reportfolio' => [
    'order' => 8,
    'text' => 'Quản lý vi phạm',
    'permission' => 'admin.report',
    'icon' => 'fa fa-fw fa-warning',
    'sub' => [
      'list_reports' => [
        'order' => 1,
        'route' => 'admin.report.index',
        'permission' => 'admin.report.index',
        'text' => 'Danh sách vi phạm'
      ],
    ],
  ],
];
