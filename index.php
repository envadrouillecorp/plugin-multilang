<?php
/*
 * Copyright (c) 2013 Baptiste Lepers
 * Released under MIT License
 *
 * Options - Entry point
 */

class Pages_Multilang_Index {
   public static $description = "Multi Lang";
   public static $isOptional = true;
   public static $activatedByDefault = true;
   public static $showOnMenu = false;
   public static $userContentName = "multilang";
   public static $userContentDefaultPosition = -1;

   public static function setupAutoload() {
   }

   static public function getTpl() {
      AutoLoader::$autoload_path[] = "./pages/options/php/";
      Options::getAdminLangs();
      $langs = UserOptions::getLangs();

      $template = new liteTemplate();
      $template->file('pages/multilang/tpl/index.tpl');
      $template->assign(array('LANGS' => implode(',', $langs['LANG'])));
      return $template->returnTpl();
   }
};
