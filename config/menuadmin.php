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
        'icon' => 'fa-sitemap',
        'text' => 'Nhóm quản trị',
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
    'order' => 3,
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
];
