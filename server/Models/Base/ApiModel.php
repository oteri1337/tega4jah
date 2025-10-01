<?php

namespace Server\Models\Base;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

class ApiModel extends Model
{


    protected $apiWith = [];

    protected $apiReadBy = "id";

    protected $apiPerPage = 700;

    protected $apiOrder = "id:desc";

    protected $apiSearchBy = "id";

    protected $apiSearchKey = "id";

    protected $apiSearchIcon = "default";


    protected function serializeDate($date)
    {
        return $date->format('Y-m-d H:i:s');
    }


    public $modelResponse = [
        'status' => "200",
        'message' => '',
        'errors' => [],
        'data' => [],
    ];


    public static function relationships($row) {

        return $row;
    }


    public function apiRead($attr)
    {
        $data = $this->where($this->apiReadBy, $attr)->first();

        $data = static::relationships($data);
    
        $this->modelResponse['data'] = $data;

        return $this->modelResponse;
    }


public function apiList()
{
    $order = $_GET['order'] ?? $this->apiOrder;
    $orderArr = explode(":", $order, 2);

    $query = $this->orderBy($orderArr[0], $orderArr[1]);

    $where = $_GET['where'] ?? false;
    if ($where) {
        $whereArr = explode(":", $where);
        $query = $query->where($whereArr[0], $whereArr[1]);
    }

    $paginator = $query->paginate($this->apiPerPage);

    // Apply relationships to each item
    $paginator->getCollection()->transform(function ($row) {
        return static::relationships($row);
    });

    $this->modelResponse['data'] = $paginator;

    return $this->modelResponse;
}



    public function apiDelete($body)
    {

        if (!isset($body['id'])) {
            $this->modelResponse['errors'] = ['id is required'];
            return $this->modelResponse;
        }


        $this->where("id", $body["id"])->delete();

        return $this->apiList();

    }







    public function apiCreate($body)
    {
        $created = $this->create($body);

        $this->modelResponse['data'] = $created;

        return $this->modelResponse;
    }



    public function apiUpdate($body)
    {

        if (!isset($body['id'])) {
            $this->modelResponse['errors'] = ['id is required'];
            return $this->modelResponse;
        }


        $data = $this->where("id", $body['id'])->first();

        $data->update($body);

        return $this->apiList();
    }


    public function apiSearch($body)
    {

        if (!isset($body['search'])) {
            $this->modelResponse['errors'] = ['search term is required'];
            return $this->modelResponse;
        }

        $paginator = $this->where($this->apiSearchBy, 'LIKE', "%{$body['search']}%")->paginate($this->apiPerPage);

        $paginator = $paginator->toArray();

        $paginator['object'] = Collection::make($paginator['data'])->keyBy($this->apiReadBy);

        $paginator['search_keys'] = $this->getSearchKeys();

        $this->modelResponse['data'] = $paginator;

        return $this->modelResponse;
    }



    public function getListShape($paginator)
    {
        $paginator = $paginator->toArray();

        $paginator['object'] = Collection::make($paginator['data'])->keyBy($this->apiReadBy);

        $paginator['search_keys'] = $this->getSearchKeys();

        return $paginator;
    }


    public function getSearchKeys()
    {

        return 1;

    }


}