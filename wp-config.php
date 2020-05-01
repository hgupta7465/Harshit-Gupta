<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'harshitgupta_db' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '-MAF>$2`!nfe-`Ei%sVLIxgOgtGq3hI<?%Dh]f&F>Q5pGh[5JX#&$Kv}7Y6LuEZ,' );
define( 'SECURE_AUTH_KEY',  '#0#0YKto#D~])qoFo_0{u4jQ9f1oQ3s-Bg;}sgEQaTQZh.Gp^JJUztR^;QAL,@Mq' );
define( 'LOGGED_IN_KEY',    'u*nKH:*,n|:~.:?- Jwz9m{m32?o4;5j;%n&[E32w AN7TTT*6`81QP{g[HQ4w;!' );
define( 'NONCE_KEY',        'MZ<GDY>oB{JU}252V%m)(ADvD+XTBX6`S(}Stm?0uVO8A4 E|u;T,@%5*gmAZF3E' );
define( 'AUTH_SALT',        'Zg8dVDz73AG8$-9q4V-2|N]*>?X#n.QqSQSPcgfq(tN`t5D^e7| r)9BkYQCG_lH' );
define( 'SECURE_AUTH_SALT', '>u)Qo sRG3Qxj^Xy(K%= a=C*Q%[,>_zZy2[,a{65j>NjnqUC&PH/<7-6<gVB R(' );
define( 'LOGGED_IN_SALT',   'u SM@g3>$SbRu:U]#Z&yKRx<f4+)0dQm;V[)1 H$gwQ}.t-9Z_fC4;+AQw}~F E ' );
define( 'NONCE_SALT',       '`q}7CG<c`b4?9&bSK%.qtAArd7;=qo0k(;9d^fYMFxYn=G$JmS(:Wbc`+7G$cIPx' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
