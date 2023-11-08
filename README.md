# demo-application
This is a demo application using Laravel/PHP and React.

![app](preview.png)

## install
Just install this how you would regularly install a [Laravel](https://laravel.com/docs) application. 

### quick install
Run:
```bash
git clone https://github.com/spinshield/demo-application
cd demo-application
composer install
php artisan key:generate
cp .env.example .env
```

Then fill in .env variables, mainly the database & spinshield api variables.

Per example:
```bash
PROMOCODE_BALANCE="CASHREFILLER"
PROMOCODE_FREESPINS="FREESPINNER"
MERCURY_API_LOGIN="10b29f3c-525f-4ce8-97fb-d1be8791c87b-211632"
MERCURY_API_PASSWORD="zvqbddHwrw27I"
MERCURY_SALT_KEY="apFEqVxuGsOX"
MERCURY_ENDPOINT="https://api_url_given.com/api/system"
```

Finish off with:
```bash
php artisan migrate:fresh
php artisan optimize:clear
npm install
npm run build
```

### callback URL
After install, you can use URL: `https://yourdomain.com/api/callbacks/demo-app` in the spinshield backoffice, you can change the callback path in `routes/api.php`.

### nginx
Check NGINX.MD for a straight forward NGINX setup for Laravel.

### config
You can find various config settings in `config/games.php`, concerning type of balance and whatever.

### disclaimer
This should only be used for development purposes while integrating your games to your own setup.

### handy permission helper
Handy permission helper to run after install (and really for any laravel install):
```bash
sudo chown -R www-data:www-data .
sudo find . -type f -exec chmod 664 {} \;
sudo find . -type d -exec chmod 775 {} \;
sudo find . -type d -exec chmod g+s {} \;
sudo chgrp -R www-data storage bootstrap/cache
sudo chmod -R ug+rwx storage bootstrap/cache
```
