<?php

/**
 * FLV building class for Chisimba
 * 
 * This file contains the definition for the class used by Chisimba to build FLV media files.
 * 
 * PHP version 5
 *  
 * This program is free software; you can redistribute it and/or modify 
 * it under the terms of the GNU General Public License as published by 
 * the Free Software Foundation; either version 2 of the License, or 
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful, 
 * but WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the 
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License 
 * along with this program; if not, write to the 
 * Free Software Foundation, Inc., 
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 * 
 * 
 * @category  Chisimba
 * @package   files
 * @author    Derek Keats <dkeats@uwc.ac.za>
 * @copyright 2007 Derek Keats
 * @license   http://www.gnu.org/licenses/gpl-2.0.txt The GNU General Public License 
 * @version   $Id$
 * @link      http://avoir.uwc.ac.za
 */
/* ----------- wrapper for ogg vorbis / theora player applet ------------*/
// security check - must be included in all scripts
if (!
/**
 * Description for $GLOBALS
 * @global unknown $GLOBALS['kewl_entry_point_run']
 * @name   $kewl_entry_point_run
 */
$GLOBALS['kewl_entry_point_run'])
    {
        die("You cannot view this page directly");
    }

/**
 * Buildflowplayer class
 * 
 * This class handles the output of Flash Media files, which are rendered in an applet on the user's browser.
 * 
 * @category  Chisimba
 * @package   files
 * @author    Derek Keats <dkeats@uwc.ac.za>
 * @copyright 2007 Derek Keats
 * @license   http://www.gnu.org/licenses/gpl-2.0.txt The GNU General Public License 
 * @version   Release: @package_version@
 * @link      http://avoir.uwc.ac.za
 * @see       object
 */
class buildflowplayer extends object
{

    /**
    *
    * @var    string $__width The width for the Flash player
    * @access public
    *                
    */
    public $width;
    /**
    *
    * @var    string  $__height The height for the Flash player
    * @access private
    *                 
    */
    public $height;
    /**
    *
    * @var    string $baseUrl The movie file baseUrl for the location of the file
    * @access public
    *                
    */
    public $baseUrl;
    /**
    *
    * @var    string $movie The movie file (in FLV format) to play
    * @access public
    *                
    */
    public $movie;
    /**
    *
    * @var    string $movie The quality to play at
    * @access public
    *                
    */
    public $quality;
      /**
    *
    * @var    string object $objConfig A string to hold the config object
    * @access public
    *                
    */
    public $objConfig;


    /**
    *
    * Constructor method to set up the default parameters for
    * the FLV player applet.
    * 
    * @access public
    *                
    */
    public function init()
    {

        //Set up the path for the error file
        $this->objConfig = $this->getObject('altconfig', 'config');
        //Set the width and height, defaulting to 500 X 400
        $this->width = $this->getParam('width', '500');
        $this->height= $this->getParam('height', '400');
        //Set the quality
        $this->quality= $this->getParam('quality', 'high');
        //Set the scale parameter
        $this->scale = $this->getParam('scale', 'noScale');
        //Set the window mode (wmode) parameter
        $this->wmode = $this->getParam('wmode', 'transparent');
        //Load the movie file from the URL in the querystring
        $this->loadMovie();
    }

    /**
    *
    * Method to render the FLV player
    *
    * @access Public
    * @return string The player applet code
    *                
    */
    public function show()
    {
        if ($this->movie=="") {
            
        } else {
            
        }
        return $this->__startApplet()
          . $this->__getParam("ALLOWSCRIPTACCESS")
          . $this->__getParam("MOVIE")
          . $this->__getParam("QUALITY")
          . $this->__getParam("SCALE")
          . $this->__getParam("WMODE")
          . $this->__getParam("FLASHVARS")
          . $this->__endApplet();

    }

    /**
    *
    * Method to load the movie from the querystrng or
    * a form submission.
    *
    * @return True It always returns true
    *              
    */
    public function loadMovie()
    {

        //Get the movie file from the query string, set it to NULL if not found
        $this->movie = $this->getParam('movie', NULL);
        if ($this->movie==NULL) {
            $this->movie = $this->__getErrFile();
            return FALSE;
        } else {
            if (!$this->__isValidFile($this->movie)) {
                $this->movie = $this->__getErrFile($efile="invalidurl.jpg");
                return FALSE;
            } else {
                return TRUE;
            }  
        }
    }


    /**
    * Method to Set the movie File
    */
    public function setMovieFile($file)
    {
        $errFile = $this->objConfig->getsiteRoot()."core_modules/files/resources/flowplayer/movies/error.flv";
        if ($this->__isValidFile($file)) {
            $this->movie = $file;
        }
        return TRUE;
    }

    /*-------------------- PRIVATE METHODS ----------------------------------*/
    
    /**
     * 
     * Method to return the URL for the file to play in the event of an error
     * 
     * @access private
     * @return string The formatted URL for the error movie
     * 
     */
    private function __getErrFile($efile="error.jpg")
    {
        //Set a file to play if there is an error finding the file from the querystring
        return "http://" . $_SERVER['SERVER_NAME'] 
          . $this->objConfig->getsiteRoot()
          . "core_modules/files/resources/flowplayer/movies/" . $efile;
    }

    /**
    *
    * Method to return the OBJECT tag with all its options set
    *
    * @return The     <OBJECT ... > part of the tag
    *                 
    * @access Private
    *                 
    */
    private function __startApplet()
    {
        //die($this->objConfig->getValue('KEWL_SITE_ROOT'));
        return "<object type=\"application/x-shockwave-flash\" "
          . "data=\"" . $this->getResourceUri('flowplayer/FlowPlayerLP.swf', 'files'). "\" "
          . "width=\"" . $this->width . "\" "
          . "height=\"" . $this->height . "\" "
          . "id=\"FlowPlayer\">\n";
    }

    /**
    *
    * Method to set one of the OBJECT parameters
    *
    * @return The     <PARAM tag for the parameter
    * @access Private
    *                 
    */
    private function __getParam($paramName=NULL)
    {
        switch ($paramName) {
            case NULL:
                return NULL;
                break;
            //<param name="allowScriptAccess" value="sameDomain" />
            case "ALLOWSCRIPTACCESS":
                return "    <param name = \"allowScriptAccess\" "
                  . "value = \"sameDomain\" />\n";
                break;
            //<param name="quality" value="high" />
            case "BASEURL":
                return "    <param name = \"baseUrl\" "
                  //. "value = \"" . $this->baseUrl . "\" />\n";
                  . "value = \"".$this->getResourceUri()."\" />\n";
            case "NOVIDEOCLIP":
                return "    <param name = \"noVideoClip\" "
                  . "value = \"" . $this->__getErrFile() . "\" />\n";
                break;
            //<param name="movie" value="modules/flowplayer/resources/FlowPlayerLP.swf" />
            case "MOVIE":
                return "    <param name = \"movie\" "
                  . "value = \"FlowPlayerLP.swf\" />\n";
                break;
            //<param name="quality" value="high" />
            case "QUALITY":
                return "    <param name = \"quality\" "
                  . "value = \"" . $this->quality . "\" />\n";
            //<param name="scale" value="noScale" />";
            case "SCALE":
                return "    <param name = \"scale\" "
                  . "value = \"" . $this->scale . "\" />\n";
            //<param name="wmode" value="transparent" />
            case "WMODE":
                return "    <param name = \"wmode\" "
                  . "value = \"" . $this->wmode . "\" />\n";
            //<param name="flashvars" value="config={ videoFile: 'river.flv' }" />
            case "FLASHVARS":
                return "    <param name = \"flashvars\" "
                  . "value = \"config={ videoFile: '" . $this->movie . "', loop:false, autoPlay:false}\" />\n";
             default:
                return NULL;
                break;
        }
    }

    /**
    *
    * Method to return the /OBJECT closing tag
    *
    * @return The     /OBJECT part of the tag
    * @access Private
    *                 
    */
    private function __endApplet()
    {
        return "</object>\n";
    }

    /**
    *
    * Method to validate the file
    *
    * @param  string     $theFile The file to be evaluated
    * @return True|False depending on whether the file is valid or not
    * @access Private   
    *                    
    * @todo   -c Implement .make it actually work. Currently it just returns true.
    *         
    */
    private function __isValidFile($theFile)
    {
        //Reverse any conversion of htmlentities
        $theFile = $this->__unhtmlentities($theFile);
        if ($this->__isUrl($theFile)) {
            return TRUE;
        } else {
            return FALSE;
        }

    }

    /**
    *
    * Method to test if the file is a valid URL
    *
    * @param  string     $theFile The file to be evaluated
    * @return True|False depending on whether the file is a valid Url or not
    * @access Private   
    *                    
    */
    private function __isUrl($url) {
        $objUrl = $this->getObject('url', 'strings');
        if (!$objUrl->isValidFormedUrl($url)) {
            return FALSE;
        } else {
            return TRUE;
        }
    }

    /**
    *
    * Method to reverse htmlentities for validating URL
    *
    * @param  string $str The string to reverse htmlentities for
    * @return string The reversed string
    *                
    */
    function __unhtmlentities($str)
    {
        $trans_tbl = get_html_translation_table(HTML_ENTITIES);
        $trans_tbl = array_flip ($trans_tbl);
        return strtr ($str, $trans_tbl);
    }

} #end of class
?>
