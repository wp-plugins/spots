=== Plugin Name ===
Contributors: interconnectit, spectacula, sanchothefat, TJNowell
Donate link: http://interconnectit.com/2364/announcing-spots/
Tags: spots, elements, snippets, widget, content management
Requires at least: 3.0
Tested up to: 3.4.2
Stable tag: 1.1.1

Content manage those little snippets of text that you need across your WordPress site and in widgets properly. Forget the text widget.

== Description ==

Here at interconnect/it we have a policy of developing client sites with the premise of "content manage everything!"  That means the little notices on sites, minor widgets and so on should not only be content managed, but they should be easy for both an end-user and a developer to work with.

To that end, we developed Spots.  This creates a custom post type that allows you to create widgets using a visual editor, whilst also giving developers an easy hook for the creation of content maneagable elements within a theme.

The plugin now uses caching in order to help ensure that the load on a typical site is kept to a minimum.  Performance is important!

The plugin is prepared for translation, if you'd like to drop us a line about your translation you can contact us through our [website](http://interconnectit.com/about/contact/).

== Installation ==

= The install =
1. You can install the plugin using the auto-install tool from the WordPress back-end.
2. To manually install, upload the folder `/icit-spots/` to `/wp-content/plugins/` directory.
3. Activate the plugin through the 'Plugins' menu in WordPress
4. You should now see the Spots widget show up under 'widgets' menu. Drop that widget into a sidebar and you can immediately create Spots.
5. You should also now see a new post type appear called Spots in your WordPress back-end.  You can create Spots here for use later or in development.

= Using the plugin =
1. Once the plugin is activated, you will see a new widget appear titled Spots.
2. Drop the widget into an appropriate widget space.
3. If you haven't already created a new Spot, you can do so directly from the widget, using the visual editor.
4. If you have already created a Spot you can opt to use this from the drop down.
5. You can edit Spots just like Posts or Pages - you'll see Spots just below the Comments menu.
6. Spots are also available as a shortcode. Click the icon in the rich text editor on posts or pages and search for the spot you want to insert.


== Developer Notes ==

Spots provides 2 template tags for developers to use shown below with their supported arguments.

`icit_spot( $id_or_name, $template );`

*   `$id_or_name`: Required. A numeric ID or the name of a spot as a string.
*   `$template`: Optional. A string used in a call to `get_template_part()`

This template tag always echos out the spot.

`icit_get_spot( $id_or_name, $template, $echo );`

Same as the above with an extra argument:

*   `$echo`: Optional. Defaults to false. A boolean to indicate whether to echo the spot content or just return it.

= Basic Usage =

You can use spots to replace boilerplate text in your themes. If you have areas in your themes where typically you would hard code the text you could use the following code:

`<?php
if ( function_exists( 'icit_spot' ) )
    icit_spot( 'Copyright' );
?>`

The above code would output the contents of a spot titled 'Copyright'. If the spot does not exist it will be created as a draft. Spots in draft mode are only visible to logged in users with editing capabilities.

= Templates =

The plugin will initially look for a file in your theme using the `get_template_part()` function. If you have a file called `spot.php` in your theme that will be the default template for all spots. The `icit_spot()` function can take a second parameter for the template part to use for example:

`<?php
if ( function_exists( 'icit_spot' ) )
    icit_spot( 'Copyright', 'copyright' );
?>`

The above code will make the plugin look in your theme folder for a file called `spot-copyright.php` to use for the output. If not available it will fall back to `spot.php` and if that is not available it will simply output the spot contents.

Use templates when you want to display a featured image from a spot or if you require some additional/alternative markup for the spot. Spots are just like posts, so in the templates you retrieve the contents of the spot using `the_content()` just as would in the loop.

**Basic spot template example:**

`<div class="spot">
    <?php the_content(); ?>
</div>`

**Spot template with featured image:**

`<div class="spot-with-image">
    <?php
        if ( has_post_thumbnail() )
            the_post_thumbnail( 'medium' );
        the_content(); ?>
</div>`

= Additional =

There are many filters and hooks available to get even more out of spotsso drop by the plugin homepage or use the forums if there is something you need to do with spots but aren't sure how.


== Frequently Asked Questions ==

= When I edit a spot template I don't see the change =

Spots has a built in caching system, a popular request when we first launched the plugin. This creates a problem when you edit the template files that spots use as we can't detect changes without creating a database query.

Place the following code in your functions.php to turn off the cache:

`define( 'SPOTS_CACHE_TIME', 0 );
`

*NOTE:* We only recommend doing this for your development environment however if your spots are dynamic or you use a site-wide caching plugin then leave the above definition in.

= Can I use Spots to replace the clunky old Text Widget? =

Yes indeed - in fact that was the first inspiration behind creating Spots - we felt the text widget was only suitable for use by people who knew HTML well.  Spots gives you a visual editor, making this much easier to use.

= Can I use Spots anywhere in my theme? =

You can, if your theme either has built-in support for Spots, or you've added the appropriate template tags.

= What happens if I put an image in a Spot? =

The image will be used as you've input it - bear in mind that in certain locations this may not work well, or your theme may not have appropriate styling in place.  In most cases it will work just fine, but do be careful not to insert images larger than the space you have available.

= How does the featured image work? =

If you have a featured image, your theme can use this for display options.  If your theme does not fully support Spots then featured images will have no effect and only the main content of the Spot will be displayed.  See the developer notes for more information on adding templates to a theme to get the most out of spots.

== Screenshots ==

1. Spots widget when you first use it
2. The Spots custom post type in action
3. Selecting a pre-existing Spot
4. The visual editor in Spots
5. A Spot output in a sidebar as a widget
6. A Template Tag replacement of content in the footer of the 2010 theme.

== Changelog ==

= 1.1.0 =
* Fixed: the new theme template API implementation actually works now! Sorry folks

= 1.0.9 =
* Added a basic options page to control the caching
* Fixed: Now uses new theme API to find templates in WordPress 3.4+

= 1.0.8 =
* Fixed: A small bug meant that permalinks were being flushed and recreated on every page load

= 1.0.7 =
* Added: Allow WordPress to do the serialisation for the transients. Was causing problems after BackupBuddy plugin was used.
* Fixed: Caching was happening even when cache time was set to 0, removed an unnecessary db query.
* Fixed: Caching was happeninig in admin which would cause GravityForms to render as the editable form
* Added: Improved styling of widget for latest WP versions
* Fixed: URL escaped ampersand in post type edit link

= 1.0.6 =
* Added: Smart default for widget title when selecting a spot
* Added: Advice on disabling the spots cache to readme.txt

= 1.0.5 =
* Added: Added support for revisions to the spots post type, idea from Doug Smith (http://smithsrus.com/).

= 1.0.4 =
* Fixed: `spot_post_exists()` to only check the spots post type to avoid displaying other content of the same name.
* Added: Made the currently selected spot more obvious when in the spot selector MCE popup.
* Fixed: TinyMCE with WordPress 3.3 would leave an editor at the bottom of the widget page.
* Fixed: TinyMCE would not tolerate other tinyMCE widget instances.
* Fixed: TinyMCE would break on drag and drop of a widget.
* Fixed: Set spot thumbnail always available even when there was no theme support for post-thumbnails.
* Fixed: Now respects your Visual editor profile settings.
* Fixed: Bug with caching system meant cache didn't flush on widget edit pages.

= 1.0.3 =
* Fixed: Featured image was not being correctly displayed as it relies on the $post global being overridden.

= 1.0.2 =
* Fixed: Bug with media upload buttons not associating the spot with its attachments on the widgets screen.

= 1.0.1 =
* Improved UI and UX on widget.
* Fixed bug that created multiple draft versions of a Spot when a template tag initiated a non-existent Spot.
* Fixed WP 3.3 missing toolbar issue in widget visual editor.

= 1.0.0 =
* Development version and Alpha release.

== Upgrade Notice ==

= 1.0.1 =
This version corrects the UI problems experienced by some users, and the repeated draft Spot creation bug when used with template tags for non-existent Spots.

= 1.0.2 =
This version corrects a bug with media upload buttons not associating the spot with its attachments on the widgets screen.

= 1.0.3 =
Bug fix. Featured image was not being correctly displayed as it relies on the $post global being overridden.

= 1.0.4 =
Fixed TinyMCE in the widget for WordPress 3.3, fixed drag and drop of a widget would break TinyMCE also several other bug fixes. Also made the currently selected spot more obvious when in the spot selector MCE pop-up.
Fixed problem with spots sharing a name with a page or post resulting in the wrong content being displayed.

= 1.0.5 =
Added support for revisions to the spots post type, idea from Doug Smith (http://smithsrus.com/).
