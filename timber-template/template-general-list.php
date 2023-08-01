<?php
/**
 * Template Name: general-list
 * Description: A Page for Yumi Sugihara.
 */

$context = Timber::context();

$timber_post     = new Timber\Post();
$context['post'] = $timber_post;

Timber::render( array( 'pages/general-list.twig', 'pages/page.twig' ), $context );
