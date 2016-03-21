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

   public static function getOptions() {
      AutoLoader::$autoload_path[] = "./pages/options/php/";
      Options::getAdminLangs(); // dummy call to a function of "Options" because UserOptions is declared in Options...
      $langs = UserOptions::getLangs();
      return array(
         array('id' => 'multilang_langs', 'type' => 'text', 'cat' => 'Multi Lang', 'default' => implode(',', $langs['LANG']), 'export' => true),
      );
   }

   static public function getTpl() {
      AutoLoader::$autoload_path[] = "./pages/options/php/";
      Options::getAdminLangs(); // dummy call to a function of "Options" because UserOptions is declared in Options...
      $langs = isset($GLOBALS['multilang_langs'])?$GLOBALS['multilang_langs']:null;
      if($langs === null) {
         $l = UserOptions::getLangs();
         $langs = implode(',', $l['LANG']);
      }

      $template = new liteTemplate();
      $template->file('pages/multilang/tpl/index.tpl');
      $template->assign(array('LANGS' => $langs));
      return $template->returnTpl();
   }
};
