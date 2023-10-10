<form action="/login" method="post">
    @csrf
    @method('POST')
    <input type="text" name="email">
    <input type="text" name="password">
    <input type="submit">
</form>