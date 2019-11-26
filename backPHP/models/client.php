<?php
class Client {
    
    private $_id;
    private $_name;
    private $_surname;
    
    // constructor
    function __construct($id, $name, $surname) {
        $this->_id = $id;
        $this->_name = $name;
        $this->_surname = $surname;
    }
    
    // getters / setters
    function set_id($id) {
        $this->_id = $id;
    }
    
    function get_id() {
        return $this->_id;
    }
    
    function set_name($name) {
        $this->_name = $name;
    }
    
    function get_name() {
        return $this->_name;
    }
    
    function set_surname($surname) {
        $this->_surname = $surname;
    }
    
    function get_surname() {
        return $this->_surname;
    }
}
?>