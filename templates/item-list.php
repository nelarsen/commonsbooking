<h3>Items</h3>
<ul>
    <?php
    // {% for item in items %}
    foreach($templateData['items'] as $item) {
        ?>
        <li><a href="<?php echo get_permalink($item->ID); ?>"><?php echo $item->post_title; ?></a></li>
        <?php
        // {% endfor %}
    }
    ?>
</ul>