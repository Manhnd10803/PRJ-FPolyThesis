<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        {{-- <meta name="csrf-token" content="{{ csrf_token() }}"> --}}
        <title>FpolyZone - Mạng xã hội học tập & giải trí</title>
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        
        <!-- Fonts -->
        <!-- <link rel="preconnect" href="https://fonts.bunny.net"> -->
        <!-- <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" /> -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

        
        @viteReactRefresh
        @vite(['resources/app/index.tsx'])
    </head>
    <body class="min-h-screen bg-background font-sans antialiased">
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="app"></div>
    </body>
</html>
