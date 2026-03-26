<?php
$opts = [
  'http' => [
    'header' => "X-Inertia: true\r\n",
    'ignore_errors' => true
  ]
];
$context = stream_context_create($opts);
$response = file_get_contents('http://127.0.0.1:8081/category/1', false, $context);
echo "STATUS: " . implode(" ", $http_response_header) . "\n";
echo "BODY: " . substr($response, 0, 1000) . "\n";
