/**
 * Created by SDS on 2017/3/1.
 */

function SHost(DEVICEID, ACCESSKEY) {
//function SHost(LOCALIP, LOCALPORT, SERVERIP, SERVERPORT, DEVICEID, ACCESSKEY) {

  /**
   * #####################################################
   * SDK 版本编号
   * #####################################################
   */
  var WEB_VERSION = 'v1.1.2';

  /**
   * #####################################################
   * 空调红外设备的按键解释
   * @type {{number: {id: number, POWER: string, model: string, wind: string, temp: string, modelIcon: string, windIcon: string}}}
   * #####################################################
   */
  var AIR_CONDITION_OPCODE_ANNOTATION = {
    0    :  {"id":  0,  "power":  "OFF","model":  "wind"  ,"modelName":  "通风"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "25"},

    1    :  {"id":  1,  "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "20"},
    2    :  {"id":  2,  "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "20"},
    3    :  {"id":  3,  "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "21"},
    4    :  {"id":  4,  "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "22"},
    5    :  {"id":  5,  "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷",    "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "23"},
    6    :  {"id":  6,  "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "24"},
    7    :  {"id":  7,  "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "25"},
    8    :  {"id":  8,  "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "26"},
    9    :  {"id":  9,  "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "27"},
    10   :  {"id":  10, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "28"},
    11   :  {"id":  11, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "29"},
    12   :  {"id":  12, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "30"},
    13   :  {"id":  13, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "20"},
    14   :  {"id":  14, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "21"},
    15   :  {"id":  15, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "22"},
    16   :  {"id":  16, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "23"},
    17   :  {"id":  17, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "24"},
    18   :  {"id":  18, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "25"},
    19   :  {"id":  19, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "26"},
    20   :  {"id":  20, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "27"},
    21   :  {"id":  21, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "28"},
    22   :  {"id":  22, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "29"},
    23   :  {"id":  23, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "30"},
    24   :  {"id":  24, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "20"},
    25   :  {"id":  25, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "21"},
    26   :  {"id":  26, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "22"},
    27   :  {"id":  27, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "23"},
    28   :  {"id":  28, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "24"},
    29   :  {"id":  29, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "25"},
    30   :  {"id":  30, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "26"},
    31   :  {"id":  31, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "27"},
    32   :  {"id":  32, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "28"},
    33   :  {"id":  33, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "29"},
    34   :  {"id":  34, "power":  "ON","model":  "refrigeration"  ,"modelName":  "制冷"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "30"},
    35   :  {"id":  35, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "20"},
    36   :  {"id":  36, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "21"},
    37   :  {"id":  37, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "22"},
    38   :  {"id":  38, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "23"},
    39   :  {"id":  39, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "24"},
    40   :  {"id":  40, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "25"},
    41   :  {"id":  41, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "26"},
    42   :  {"id":  42, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "27"},
    43   :  {"id":  43, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "28"},
    44   :  {"id":  44, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "29"},
    45   :  {"id":  45, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "30"},
    46   :  {"id":  46, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "20"},
    47   :  {"id":  47, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "21"},
    48   :  {"id":  48, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "22"},
    49   :  {"id":  49, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "23"},
    50   :  {"id":  50, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "24"},
    51   :  {"id":  51, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "25"},
    52   :  {"id":  52, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "26"},
    53   :  {"id":  53, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "27"},
    54   :  {"id":  54, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "28"},
    55   :  {"id":  55, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "29"},
    56   :  {"id":  56, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "30"},
    57   :  {"id":  57, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "20"},
    58   :  {"id":  58, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "21"},
    59   :  {"id":  59, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "22"},
    60   :  {"id":  60, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "23"},
    61   :  {"id":  61, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "24"},
    62   :  {"id":  62, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "25"},
    63   :  {"id":  63, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "26"},
    64   :  {"id":  64, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "27"},
    65   :  {"id":  65, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "28"},
    66   :  {"id":  66, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "29"},
    67   :  {"id":  67, "power":  "ON","model":  "heating"  ,"modelName":  "制热"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "30"},
    68   :  {"id":  68, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "20"},
    69   :  {"id":  69, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "21"},
    70   :  {"id":  70, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "22"},
    71   :  {"id":  71, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "23"},
    72   :  {"id":  72, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "24"},
    73   :  {"id":  73, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "25"},
    74   :  {"id":  74, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "26"},
    75   :  {"id":  75, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "27"},
    76   :  {"id":  76, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "28"},
    77   :  {"id":  77, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "29"},
    78   :  {"id":  78, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "30"},
    79   :  {"id":  79, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "20"},
    80   :  {"id":  80, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "21"},
    81   :  {"id":  81, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "22"},
    82   :  {"id":  82, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "23"},
    83   :  {"id":  83, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "24"},
    84   :  {"id":  84, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "25"},
    85   :  {"id":  85, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "26"},
    86   :  {"id":  86, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "27"},
    87   :  {"id":  87, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "28"},
    88   :  {"id":  88, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "29"},
    89   :  {"id":  89, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "30"},
    90   :  {"id":  90, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "20"},
    91   :  {"id":  91, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "21"},
    92   :  {"id":  92, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "22"},
    93   :  {"id":  93, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "23"},
    94   :  {"id":  94, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "24"},
    95   :  {"id":  95, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "25"},
    96   :  {"id":  96, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "26"},
    97   :  {"id":  97, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "27"},
    98   :  {"id":  98, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "28"},
    99   :  {"id":  99, "power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "29"},
    100  :  {"id":  100,"power":  "ON","model":  "wind",     "modelName":  "通风"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "30"},
    101  :  {"id":  101,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "20"},
    102  :  {"id":  102,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "21"},
    103  :  {"id":  103,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "22"},
    104  :  {"id":  104,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "23"},
    105  :  {"id":  105,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "24"},
    106  :  {"id":  106,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "25"},
    107  :  {"id":  107,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "26"},
    108  :  {"id":  108,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "27"},
    109  :  {"id":  109,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "28"},
    110  :  {"id":  110,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "29"},
    111  :  {"id":  111,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "low"  ,   "windName":  "低速"  ,  "temp":  "30"},
    112  :  {"id":  112,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "20"},
    113  :  {"id":  113,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "21"},
    114  :  {"id":  114,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "22"},
    115  :  {"id":  115,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "23"},
    116  :  {"id":  116,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "24"},
    117  :  {"id":  117,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "25"},
    118  :  {"id":  118,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "26"},
    119  :  {"id":  119,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "27"},
    120  :  {"id":  120,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "28"},
    121  :  {"id":  121,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "29"},
    122  :  {"id":  122,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "middle"  ,"windName":  "中速"  ,  "temp":  "30"},
    123  :  {"id":  123,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "20"},
    124  :  {"id":  124,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "21"},
    125  :  {"id":  125,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "22"},
    126  :  {"id":  126,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "23"},
    127  :  {"id":  127,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "24"},
    128  :  {"id":  128,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "25"},
    129  :  {"id":  129,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "26"},
    130  :  {"id":  130,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "27"},
    131  :  {"id":  131,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "28"},
    132  :  {"id":  132,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "29"},
    133  :  {"id":  133,"power":  "ON","model":  "dehumi" ,  "modelName":  "除湿"  ,  "wind":  "strong"  ,"windName":  "高速"  ,  "temp":  "30"}
  };

  /**
   * #####################################################
   * 主机反馈信息中的opcode 类型
   * @type {string}
   * #####################################################
   */
  var OPCODE_TYPE_INFO       = 'info';
  var OPCODE_TYPE_LOGIN      = 'login';
  var OPCODE_TYPE_SYNCH      = 'synch';
  var OPCODE_TYPE_STATUS     = 'status';
  var OPCODE_TYPE_CONFIG     = 'config';
  var OPCODE_TYPE_OPERATE    = 'operate';
  var OPCODE_TYPE_UNKNOWN    = 'unknown';
  var OPCODE_TYPE_IDENTIFY   = 'identify';
  var OPCODE_TYPE_HEARTBEAT  = 'heartbeat';
  var OPCODE_TYPE_NOTIFY     = 'notify';

  var SHOST_FEEDBACK_OPCODE = {
    //对象：用户 || 登录反馈报文
    "LOGIN"           : OPCODE_TYPE_LOGIN,

    //对象：主机 || 同步主机信息反馈报文
    "SYNC_INFO"       : OPCODE_TYPE_SYNCH,
    "NEW_DEVICES"     : OPCODE_TYPE_SYNCH,

    "GET_CCU_INFO"    : OPCODE_TYPE_SYNCH,

    "CCU_HB"          : OPCODE_TYPE_HEARTBEAT,

    "NEW_DEVICES_NOTIFY"     : OPCODE_TYPE_NOTIFY,

    //对象：所有zigbee设备 || 设备定位
    //"IDENTIFY_DEV"         : OPCODE_TYPE_IDENTIFY,
    //"IDENTIFY_DEV_PUSH"    : OPCODE_TYPE_IDENTIFY,

    //对象 || operate_type : 1
    "SWITCH"                       : OPCODE_TYPE_OPERATE,

    //对象 || operate_type  : 501

    //对象 || operate_type  : 1001
    //"SWITCH"                       : OPCODE_TYPE_OPERATE,

    //对象 || operate_type  : 1002
    //"SWITCH"                       : OPCODE_TYPE_OPERATE,

    //对象 || operate_type  : 1003
    //"SWITCH"       : OPCODE_TYPE_OPERATE,
    "MOVE_TO_POS"    : OPCODE_TYPE_OPERATE,
    "DOOYA_CONFIG"   : OPCODE_TYPE_OPERATE,
    "DOOYA_STATUS"   : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 1501
    "START_INFRARED_LEARN"             : OPCODE_TYPE_CONFIG,
    "RECV_INFRARED_CODE"               : OPCODE_TYPE_CONFIG,
    "SAVE_INFRARED_CODE"               : OPCODE_TYPE_CONFIG,
    "SAVE_INFRARED_RC"                 : OPCODE_TYPE_CONFIG,
    "SET_INFRARED_RC_BIND_SOCCKET"     : OPCODE_TYPE_CONFIG,
    "SEND_INFRARED_CODE"               : OPCODE_TYPE_OPERATE,
    "CONTROLLER_SMART_SWITCH_ON"       : OPCODE_TYPE_OPERATE,
    "CONTROLLER_SMART_SWITCH_OFF"      : OPCODE_TYPE_OPERATE,
    "GET_CONTROLLER_BIND_SMART_SOCKET" : OPCODE_TYPE_INFO,

    //对象 || operate_type  : 1502
    //"START_INFRARED_LEARN"             : OPCODE_TYPE_CONFIG,
    //"RECV_INFRARED_CODE"               : OPCODE_TYPE_CONFIG,
    //"SAVE_INFRARED_CODE"               : OPCODE_TYPE_CONFIG,
    //"SAVE_INFRARED_RC"                 : OPCODE_TYPE_CONFIG,
    //"SET_INFRARED_RC_BIND_SOCCKET"     : OPCODE_TYPE_CONFIG,
    "INFRARED_TRANSCEIVER_BIND_CODE_LIB"                    : OPCODE_TYPE_CONFIG,
    "GET_LOCAL_CODE_LIB"                                    : OPCODE_TYPE_CONFIG,
    "GET_CODE_LIB_UI_TEMPLATE"                              : OPCODE_TYPE_CONFIG,
    "MATCH_CLOUD_CODE_LIB"                                  : OPCODE_TYPE_CONFIG,
    "TEST_CODE_LIB"                                         : OPCODE_TYPE_CONFIG,
    "UPLOAD_CODE_LIB_TO_INFRARED_TRANSCEIVER"               : OPCODE_TYPE_CONFIG,
    "UPLOAD_CODE_LIB_TO_INFRARED_TRANSCEIVER_PROGRESS_PUSH" : OPCODE_TYPE_CONFIG,
    "RESET_INFRARED_TRANSCEIVER_CODE_LIB_BIND"              : OPCODE_TYPE_CONFIG,
    "CREATE_NEW_CODE_LIB"                                   : OPCODE_TYPE_CONFIG,
    "CREATE_NEW_CODE_LIB_PROGRESS_PUSH"                     : OPCODE_TYPE_CONFIG,
    "GET_CODE_LIB_BIND_INFRARED_TRANSCEIVERS"               : OPCODE_TYPE_CONFIG,
    "DEL_LOCAL_CODE_LIB"                                    : OPCODE_TYPE_CONFIG,
    "RENAME_LOCAL_CODE_LIB"                                 : OPCODE_TYPE_CONFIG,
    "GET_CODE_LIB_WORKING_TASK"                             : OPCODE_TYPE_CONFIG,
    //"SEND_INFRARED_CODE"               : OPCODE_TYPE_OPERATE,
    //"CONTROLLER_SMART_SWITCH_ON"       : OPCODE_TYPE_OPERATE,
    //"CONTROLLER_SMART_SWITCH_OFF"      : OPCODE_TYPE_OPERATE,
    //"GET_CONTROLLER_BIND_SMART_SOCKET" : OPCODE_TYPE_INFO,

    //对象 || operate_type  : 2001
    //"SWITCH"                         : OPCODE_TYPE_OPERATE,
    //"GET_ELECTRICAL"                 : OPCODE_TYPE_INFO,
    //"GET_VOLTAGE"                    : OPCODE_TYPE_INFO,
    //"GET_DEV_POWER"                  : OPCODE_TYPE_INFO,
    "STATUS"                         : OPCODE_TYPE_STATUS,
    //"GET_POWER"                      : OPCODE_TYPE_INFO,
    //"GET_POWER_V2"                   : OPCODE_TYPE_INFO,

    //对象 || operate_type  : 2002
    //"SWITCH"                         : OPCODE_TYPE_OPERATE,
    //"GET_ELECTRICAL"                 : OPCODE_TYPE_INFO,
    //"GET_VOLTAGE"                    : OPCODE_TYPE_INFO,
    //"GET_DEV_POWER"                  : OPCODE_TYPE_INFO,
    "ZB_LIGHT_SWITCH"                : OPCODE_TYPE_OPERATE,
    //"STATUS"                         : OPCODE_TYPE_STATUS,
    //"GET_POWER_V2"                   : OPCODE_TYPE_INFO,
    //"GET_POWER"                      : OPCODE_TYPE_INFO,

    //对象 || operate_type  : 2003
    //"SWITCH"                       : OPCODE_TYPE_OPERATE,
    //"STATUS"                         : OPCODE_TYPE_STATUS,
    //"GET_POWER_V2"                   : OPCODE_TYPE_INFO,
    //"GET_POWER"                      : OPCODE_TYPE_INFO,

    //对象 || operate_type  : 2004
    //"SWITCH"                       : OPCODE_TYPE_OPERATE,
    //"STATUS"                         : OPCODE_TYPE_STATUS,
    //"GET_POWER_V2"                   : OPCODE_TYPE_INFO,
    //"GET_POWER"                      : OPCODE_TYPE_INFO,

    //对象 || operate_type  : 2501
    "OPEN_NET_CHANNEL"             : OPCODE_TYPE_OPERATE,
    "SET_GW_NAME"                  : OPCODE_TYPE_CONFIG,

    //对象 || operate_type  : 3001
    "SENSOR_BOOL"                  : OPCODE_TYPE_STATUS,
    "ALARM_ACTIVATED"              : OPCODE_TYPE_STATUS,
    "ALARM_DEACTIVATED"            : OPCODE_TYPE_STATUS,
    "SENSOR_BOOL_STATUS"           : OPCODE_TYPE_STATUS,
    "POWER_NOTIFY"                 : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 3002
    //"SENSOR_BOOL"                  : OPCODE_TYPE_STATUS,
    //"ALARM_ACTIVATED"              : OPCODE_TYPE_STATUS,
    //"ALARM_DEACTIVATED"            : OPCODE_TYPE_STATUS,
    //"POWER_NOTIFY"                 : OPCODE_TYPE_STATUS,
    //"SENSOR_BOOL_STATUS"           : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 3003
    //"SENSOR_BOOL"                  : OPCODE_TYPE_STATUS,
    //"ALARM_ACTIVATED"              : OPCODE_TYPE_STATUS,
    //"ALARM_DEACTIVATED"            : OPCODE_TYPE_STATUS,
    //"POWER_NOTIFY"                 : OPCODE_TYPE_STATUS,
    //"SENSOR_BOOL_STATUS"           : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 3004
    //"SENSOR_BOOL"                  : OPCODE_TYPE_STATUS,
    //"ALARM_ACTIVATED"              : OPCODE_TYPE_STATUS,
    //"ALARM_DEACTIVATED"            : OPCODE_TYPE_STATUS,
    //"POWER_NOTIFY"                 : OPCODE_TYPE_STATUS,
    //"SENSOR_BOOL_STATUS"           : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 3499
    //"SENSOR_BOOL"                  : OPCODE_TYPE_STATUS,
    //"ALARM_ACTIVATED"              : OPCODE_TYPE_STATUS,
    //"ALARM_DEACTIVATED"            : OPCODE_TYPE_STATUS,
    //"POWER_NOTIFY"                 : OPCODE_TYPE_STATUS,
    //"SENSOR_BOOL_STATUS"           : OPCODE_TYPE_STATUS,
    "DOOR_CONTACT_NOTIFY"          : OPCODE_TYPE_STATUS,
    "DOOR_CONTACT_STATUS"          : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 3501
    //"SWITCH"                  : OPCODE_TYPE_OPERATE,

    //对象 || operate_type  : 3502
    "SOS_ACTIVED"               : OPCODE_TYPE_STATUS,
    "CLEAR_SOS_ALARM"           : OPCODE_TYPE_OPERATE,

    //对象 || operate_type  : 4001

    //对象 || operate_type  : 4501
    //"SWITCH"                       : OPCODE_TYPE_OPERATE,
    "LOCK_ALARM"                    : OPCODE_TYPE_STATUS,
    "LOCK_STATUS"                   : OPCODE_TYPE_STATUS,
    //"POWER_NOTIFY"                 : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 4502
    //"SWITCH"                          : OPCODE_TYPE_OPERATE,
    //"LOCK_ALARM"                      : OPCODE_TYPE_STATUS,
    "SYNC_LOCK_TIME"                  : OPCODE_TYPE_CONFIG,
    "OPEN_LOCK_USER_NOTIFY"           : OPCODE_TYPE_NOTIFY,
    "LOCK_USER"                       : OPCODE_TYPE_CONFIG,
    "LOCK_OPEN_LOG"                   : OPCODE_TYPE_INFO,
    "KONKE_LOCK_REMOTE_OPEN_DISABLE"  : OPCODE_TYPE_NOTIFY,
    "LOCK_USER_NICKNAME"              : OPCODE_TYPE_CONFIG,
    "LOCK_STATUS_NOTIFY"              : OPCODE_TYPE_STATUS,
    //"POWER_NOTIFY"                    : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 5001

    //对象 || operate_type  : 5501
    "OPEN_ALERTOR"                 : OPCODE_TYPE_OPERATE,
    "CLOSE_ALERTOR"                : OPCODE_TYPE_OPERATE,

    //对象 || operate_type  : 6001

    //对象 || operate_type  : 10001
    "SENSOR_NUMERICAL"             : OPCODE_TYPE_STATUS,
    //"POWER_NOTIFY"                 : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 10002
    //"SENSOR_NUMERICAL"             : OPCODE_TYPE_STATUS,
    //"POWER_NOTIFY"                 : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 10003
    //"SENSOR_NUMERICAL"             : OPCODE_TYPE_STATUS,
    "ILLUMINOMETER_NUMERICAL"      : OPCODE_TYPE_STATUS,
    "ILLUMINOMETER_GRADE"          : OPCODE_TYPE_STATUS,
    //"POWER_NOTIFY"                 : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 10004
    //"SENSOR_NUMERICAL"             : OPCODE_TYPE_STATUS,
    //"POWER_NOTIFY"                 : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 10005
    //"SENSOR_NUMERICAL"             : OPCODE_TYPE_STATUS,
    //"POWER_NOTIFY"                 : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 10501

    //对象 || operate_type  : 11001
    //"OPEN_ALERTOR"                 : OPCODE_TYPE_OPERATE,
    //"CLOSE_ALERTOR"                : OPCODE_TYPE_OPERATE,
    "ZIGBEE_ALERTOR_STATUS"        : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : 11501
    "SHORTCUT_PANEL_ACTIVE"        : OPCODE_TYPE_OPERATE,
    "SHORTCUT_PANEL_ACTIVE_PUSH"   : OPCODE_TYPE_STATUS,
    "SET_SHORTCUT_PANEL_ACTIONS"   : OPCODE_TYPE_CONFIG,
    //"POWER_NOTIFY"                 : OPCODE_TYPE_STATUS,

    //对象 || 某一区域的所有灯设备  "0"
    "ALL_LIGHTS_ON"        : OPCODE_TYPE_OPERATE,
    "ALL_LIGHTS_OFF"       : OPCODE_TYPE_OPERATE,

    //对象 || operate_type  : "ifttt"  "-1"
    "ADD_RULE"       : OPCODE_TYPE_CONFIG,
    "UPDATE_RULE"    : OPCODE_TYPE_CONFIG,
    "ADD_EX_RULE"    : OPCODE_TYPE_CONFIG,
    "UPDATE_EX_RULE" : OPCODE_TYPE_CONFIG,
    "DELETE_RULE"    : OPCODE_TYPE_CONFIG,
    "ENABLE_RULE"    : OPCODE_TYPE_CONFIG,
    "DISABLE_RULE"   : OPCODE_TYPE_CONFIG,

    //对象 || operate_type  : "scene" "-2"
    "ADD_SCENE"     : OPCODE_TYPE_CONFIG,
    "DELETE_SCENE"  : OPCODE_TYPE_CONFIG,
    "UPDATE_SCENE"  : OPCODE_TYPE_CONFIG,
    "SET_SCENE_ACTIONS" : OPCODE_TYPE_CONFIG,
    "SET_TIMER"         : OPCODE_TYPE_CONFIG,

    //对象 || operate_type  : "scene" "-4"
    "ACTIVE_HUE_GW"     : OPCODE_TYPE_CONFIG,
    "OPEN_HUE_GW_NET"   : OPCODE_TYPE_CONFIG,
    "SET_HUE_LIGHT"     : OPCODE_TYPE_CONFIG,
    "DEL_HUE_LIGHT"     : OPCODE_TYPE_CONFIG,
    "OPT_HUE_LIGHT"     : OPCODE_TYPE_OPERATE,

    //对象 || operate_type  : "k2pro" "-5"
    "SOCKET_SWITCH"                : OPCODE_TYPE_OPERATE,
    "LIGHT_SWITCH"                 : OPCODE_TYPE_OPERATE,
    "USB_SWITCH"                   : OPCODE_TYPE_OPERATE,
    "KONKE_SOCKET_STATUS"          : OPCODE_TYPE_STATUS,
    "KONKE_SOCKET_ONLINE_STATUS"   : OPCODE_TYPE_STATUS,
    "SET_KONKE_SOCKET"     : OPCODE_TYPE_CONFIG,
    "DEL_KONKE_SOCKET"     : OPCODE_TYPE_CONFIG,

    //对象 || operate_type  : "klight" "-6"
    "SET_KONKE_LIGHT_PARAMS"      : OPCODE_TYPE_OPERATE,
    "SET_KONKE_LIGHT_MODEL"       : OPCODE_TYPE_OPERATE,
    "KONKE_LIGHT_STATUS"          : OPCODE_TYPE_STATUS,
    "KONKE_LIGHT_ONLINE_STATUS"   : OPCODE_TYPE_STATUS,
    "SET_KONKE_LIGHT"     : OPCODE_TYPE_CONFIG,
    "DEL_KONKE_LIGHT"     : OPCODE_TYPE_CONFIG,

    //对象 || 某一区域的所有电机设备  "-9"
    "ALL_CURTAINS_OPEN"    : OPCODE_TYPE_OPERATE,
    "ALL_CURTAINS_STOP"    : OPCODE_TYPE_OPERATE,
    "ALL_CURTAINS_CLOSE"   : OPCODE_TYPE_OPERATE,

    //对象 || operate_type  : "h8002" "-10"
    "SET_KONKE_HUMIDIFIER"   : OPCODE_TYPE_CONFIG,
    "DEL_KONKE_HUMIDIFIER"   : OPCODE_TYPE_CONFIG,
    "KONKE_HUMIDIFIER_SWITCH"          : OPCODE_TYPE_OPERATE,
    "ADJUST_KONKE_HUMIDIFIER_FOGVOL"   : OPCODE_TYPE_OPERATE,
    "SET_KONKE_HUMIDIFIER_CONSTANDWET" : OPCODE_TYPE_OPERATE,
    "KONKE_HUMIDIFIER_ONLINE_STATUS"   : OPCODE_TYPE_STATUS,
    "KONKE_HUMIDIFIER_STATUS"          : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : "niap" "-11"
    "SET_KONKE_AIRCLEANER"   : OPCODE_TYPE_CONFIG,
    "DEL_KONKE_AIRCLEANER"   : OPCODE_TYPE_CONFIG,
    "KONKE_AIRCLEANER_SWITCH"          : OPCODE_TYPE_OPERATE,
    "SET_KONKE_AIRCLEANER_MODEL"       : OPCODE_TYPE_OPERATE,
    "KONKE_AIRCLEANER_ANION_SWITCH"    : OPCODE_TYPE_OPERATE,
    "SET_KONKE_AIRCLEANER_WIND_VOL"    : OPCODE_TYPE_OPERATE,
    "KONKE_AIRCLEANER_ONLINE_STATUS"   : OPCODE_TYPE_STATUS,
    "KONKE_AIRCLEANER_STATUS"          : OPCODE_TYPE_STATUS,

    //对象 || operate_type  : "GENERAL DEVICE"
    "SET_FLOORS"     : OPCODE_TYPE_CONFIG,
    "ADD_ROOM"       : OPCODE_TYPE_CONFIG,
    "UPDATE_ROOM"    : OPCODE_TYPE_CONFIG,
    "DEL_ROOM"       : OPCODE_TYPE_CONFIG,
    "SETUP_NODE"     : OPCODE_TYPE_CONFIG,
    "DEL_DEVICE"     : OPCODE_TYPE_CONFIG,

    //对象 || 报警信息
    "ALARM_NOTIFY"         : OPCODE_TYPE_STATUS,
    "DEL_ALARM_NOTIFY"     : OPCODE_TYPE_STATUS,

    //对象 || 布防
    "ARMING_LEAVE_HOME"    : OPCODE_TYPE_OPERATE,
    "ARMING_IN_HOME"       : OPCODE_TYPE_OPERATE,
    "DISARMING"            : OPCODE_TYPE_OPERATE,
    "CANCEL_WARNING"       : OPCODE_TYPE_OPERATE,

    ""  :  OPCODE_TYPE_UNKNOWN
  };

  var SHOST_FEEDBACK_SUCCESS_STATUS = "success";
  var SHOST_FEEDBACK_FAILED_STATUS  = "failed";
  var SHOST_FEEDBACK_OPCODE_LOGIN   = "LOGIN";
  var SHOST_FEEDBACK_OPCODE_SYNCH   = "SYNC_INFO";
  var SHOST_FEEDBACK_OPCODE_NEWDEVICES   = "NEW_DEVICES";
  var SHOST_FEEDBACK_OPCODE_CCUINFO = "GET_CCU_INFO";

  /**
   * #####################################################
   * MethodServices 通用方法  通用函数 数组的类型判断  数组的深拷贝
   * #####################################################
   */
  var MethodServices = {
    isArray : function (obj) {return Object.prototype.toString.call(obj) === '[object Array]';},
    cloneArray : function (originArray, targetArray) {
      for (var index = 0; index < originArray.length; index++) {
        targetArray.push(originArray[index]);
      }
    }
  };

  /**
   * #####################################################
   * SHostLog 日志打印
   * #####################################################
   */
  var SHostLog = {
    enable : true,
    log   : function (message) {if (this.enable) {console.log(message);}},
    info  : function (message) {if (this.enable) {console.info(message);}},
    warn  : function (message) {if (this.enable) {console.warn(message);}},
    error : function (message) {if (this.enable) {console.error(message);}},
    setEnable : function (bool) {if (typeof bool === 'boolean') {this.enable = bool;}}
  };

  /**
   * #####################################################
   * SHOST_DEVICES_TYPE 设备类型
   * status             解析opcode，分析设备状态信息
   * action             情景模式动作/IFTTT规则动作
   * configAction       配置设备协议
   * operateType        设备操作类型
   * operateAction      设备操作动作
   * operateStatus      设备操作状态模板
   * IFTTTCondition     设备支持IFTTT的条件
   * #####################################################
   */
  var SHOST_DEVICES_TYPE = {
    hostDevicesTypeMap : {
      "*" : {
        status          : function (data) {return null;},
        configAction    : null,
        operateType     : "undefined",
        operateAction   : null,
        operateStatus   : null,
        actionConversion  : function(data) {return null;},
        IFTTTConditionConversion : function(data) {return null;}
      },

      "GENERAL"                     : {
        operateType     : null,
        operateStatus   : null,
        status          : null,
        configAction    : {
          setFloor      : '{"arg":[{"floor_id":"","floor_pos":"","in_user":""}],"nodeid":"*","opcode":"SET_FLOORS", "requester":"HJ_Config"}',
          addRoom       : '{"arg":{"floor_id":"","name":"","room_icon":"","room_pos":""}, "nodeid":"*","opcode":"ADD_ROOM","requester":"HJ_Config"}',
          editRoom      : '{"arg":{"room_id":"","floor_id":"","name":"","room_icon":"", "room_pos":""},"nodeid":"*","opcode":"UPDATE_ROOM", "requester":"HJ_Config"}',
          deleteRoom    : '{"arg":{"room_id":""},"nodeid":"*","opcode":"DEL_ROOM", "requester":"HJ_Config"}',
          editDevice    : '{"arg":{"name":"","device_icon":"","room_id":"","device_pos":""}, "nodeid":"","opcode":"SETUP_NODE","requester":"HJ_Config"}',
          deleteDevice  : '{"arg":{"name":"","device_icon":"","room_id":"-1","device_pos":""}, "nodeid":"","opcode":"SETUP_NODE","requester":"HJ_Config"}',
          deleteNode    : '{"arg":{"mac":""},"nodeid":"*","opcode":"DEL_DEVICE", "requester":"HJ_Server"}'
        },
        operateAction   : null,
        actionConversion  : function(data){return null;},
        IFTTTConditionConversion  : function(data){return null;}
      },

      "ZIGBEE_Light"                : {
        operateType     : "1",
        operateStatus   : '{ "switch" : null }',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              status.switch = null;
              break;
            case "SWITCH":
              status.switch = data.arg;
              break;
            default:
              SHostLog.warn("device type 1 = ZIGBEE_Light, unknown opcode : \n" + data.opcode);
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : {
          switch        : '{ "nodeid": "", "arg": "", "requester": "HJ_Server", "opcode": "SWITCH"}'
        },
        actionMap         : {
          "CYCLE" : "循环交替",
          "循环交替" : "CYCLE",
          "OFF" : "关",
          "ON"  : "开",
          "关"  : "OFF",
          "开"  : "ON"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionMap : {
          "OFF" : "关",
          "ON"  : "开",
          "关"  : "OFF",
          "开"  : "ON"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_CurtainMotor"         : {
        operateType     : "1001",
        operateStatus   : '{ "switch" : null }',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              status.switch = null;
              break;
            case "SWITCH":
              status.switch = data.arg;
              break;
            default:
              SHostLog.error("device type 1001 = ZIGBEE_CurtainMotor, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : {
          switch        : '{"nodeid": "", "arg": "","requester":"HJ_Server","opcode": "SWITCH"}'
        },
        actionMap          : {
          "OPEN"   : "开",
          "STOP"   : "停",
          "CLOSE"  : "关",
          "停"  : "STOP",
          "关"  : "OFF",
          "开"  : "ON"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionMap  : {
          "OPEN"   : "开",
          "STOP"   : "停",
          "CLOSE"  : "关",
          "停"  : "STOP",
          "关"  : "OFF",
          "开"  : "ON"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_RollingDoor"          : {
        operateType     : "1002",
        operateStatus   : '{ "switch" : null }',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              status.switch = null;
              break;
            case "SWITCH":
              status.switch = data.arg;
              break;
            default:
              SHostLog.error("device type 1001 = ZIGBEE_CurtainMotor, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : {
          switch        : '{"nodeid": "", "arg": "","requester":"HJ_Server","opcode": "SWITCH"}'
        },
        actionMap          : {
          "OPEN"   : "开",
          "STOP"   : "停",
          "CLOSE"  : "关",
          "停"  : "STOP",
          "关"  : "OFF",
          "开"  : "ON"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionMap  : {
          "OPEN"   : "开",
          "STOP"   : "停",
          "CLOSE"  : "关",
          "停"  : "STOP",
          "关"  : "OFF",
          "开"  : "ON"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_DOOYAMotor"           : {
        operateType     : "1003",
        operateStatus   : '{"switch":null,"position":null,"direction":null,"drag":null,"state":null,"route":null}',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "SWITCH":
              status.switch = data.arg;
              break;
            case "MOVE_TO_POS":
              status.position = data.arg;
              break;
            case "DOOYA_CONFIG":
              status.route = "1";
              break;
            case "DOOYA_STATUS":
              status.switch = data.arg.switchStatus;
              status.position = data.arg.motorPos;
              status.direction = (data.arg.motorDir == "0");
              status.drag = (data.arg.pullEnable == "0");
              status.route = (data.arg.routeCfg == "1");
              if (data.arg.motorStatus == "0") {
                status.state = "STOP";
              }
              else if (data.arg.motorStatus == "1") {
                status.state = "OPEN";
              }
              else if (data.arg.motorStatus == "2") {
                status.state = "CLOSE";
              }
              else if (data.arg.motorStatus == "3") {
                status.state = "SETTING";
              }
              else if (data.arg.motorStatus == "4") {
                status.state = "HAMPERED";
              }
              else {
                SHostLog.error("device type 1003 = ZIGBEE_DOOYAMotor, message : \n" + JSON.stringify(data));
              }

              break;
            default:
              SHostLog.error("device type 1003 = ZIGBEE_DOOYAMotor, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : {
          switch        : '{"nodeid": "", "arg": "","requester":"HJ_Server","opcode": "SWITCH"}',
          position      : '{"nodeid":"","opcode":"MOVE_TO_POS","arg":"","requester":"HJ_Server"}',
          routeInit     : '{"nodeid":"","opcode":"DOOYA_CONFIG","arg":{"cmd":"SET_ROUTE","cmd_arg":"*"},"requester":"HJ_Server"}'
        },
        actionMap          : {
          "OPEN"  : "开",
          "STOP"  : "停",
          "CLOSE" : "关",
          "停" : "STOP",
          "关" : "CLOSE",
          "开" : "OPEN"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionMap  : {
          "OPEN"   : "开",
          "STOP"   : "停",
          "CLOSE"  : "关",
          "停"  : "STOP",
          "关"  : "CLOSE",
          "开"  : "OPEN"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_InfraredTransponder"  : {
        operateType     : "1501",
        operateStatus   : '{"buttonId":null, "power":"OFF", "temp":"25", "model":"wind", "wind":"middle", "modelName":"送风", "strong":"中风"}',
        status : function(data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              status.buttonId = "0";
              break;
            case "SEND_INFRARED_CODE":
              status.buttonId = data.arg;
              break;
            default:
              SHostLog.warn("device type 1501 = ZIGBEE_InfraredTransponder, unknown opcode : \n" + data.opcode);
              break;
          }

          return status;
        },
        configAction    : {
          learnInfrared   : '{"nodeid":"","opcode":"START_INFRARED_LEARN","arg":"","requester":"HJ_Server"}',
          saveInfrared    : '{"nodeid":"","opcode":"SAVE_INFRARED_CODE","arg":"","requester":"HJ_Server"}',
          saveInterface   : '{"nodeid":"","opcode":"SAVE_INFRARED_RC","arg":[],"requester":"HJ_Config"}',
          bindSocket      : '{"nodeid":"","opcode":"SET_INFRARED_RC_BIND_SOCCKET", "arg":"-1","requester":"HJ_Config"}'
        },
        operateAction    : {
          sendInfrared : '{"nodeid": "","opcode": "SEND_INFRARED_CODE", "arg":"","requester":"HJ_Server"}',
          smartSwitchOn : '{"nodeid": "","opcode": "CONTROLLER_SMART_SWITCH_ON","arg":"*", "requester":"HJ_Server"}',
          smartSwitchOff : '{"nodeid": "","opcode": "CONTROLLER_SMART_SWITCH_OFF","arg":"*", "requester":"HJ_Server"}'
        },
        infoAction : {
          getSocketId : '{ "nodeid": "","opcode": "GET_CONTROLLER_BIND_SMART_SOCKET", "arg":"*", "requester":"HJ_Config"}'
        },
        actionConversion : function(data) {
          return data + '';
        },
        IFTTTConditionConversion : function(data) {
          return data + '';
        }
      },
      "ZIGBEE_InfraredEmitter"      : {
        operateType     : "1502",
        operateStatus   : '{"buttonId":null, "power":"OFF", "temp":"25", "model":"wind", "wind":"middle", "modelName":"送风", "strong":"中风"}',
        status : function(data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              status.buttonId = "0";
              break;
            case "SEND_INFRARED_CODE":
              status.buttonId = data.arg;
              break;
            default:
              SHostLog.warn("device type 1502 = ZIGBEE_InfraredEmitter, unknown opcode : \n" + data.opcode);
              break;
          }

          return status;
        },
        configAction    : {
          learnInfrared   : '{"nodeid":"","opcode":"START_INFRARED_LEARN","arg":"","requester":"HJ_Server"}',
          saveInfrared    : '{"nodeid":"","opcode":"SAVE_INFRARED_CODE","arg":"","requester":"HJ_Server"}',
          saveInterface   : '{"nodeid":"","opcode":"SAVE_INFRARED_RC","arg":[{"id":"","status":"","icon":"","name":""}],"requester":"HJ_Config"}',
          bindSocket      : '{"nodeid":"","opcode":"SET_INFRARED_RC_BIND_SOCCKET", "arg":"","requester":"HJ_Config"}',
          bindCodeLib     : '{"nodeid":"","opcode":"INFRARED_TRANSCEIVER_BIND_CODE_LIB", "arg":"*","requester":"HJ_Config"}',
          getCodeLibList  : '{"nodeid":"*","opcode":"GET_LOCAL_CODE_LIB","arg":{"filters":[{"type":"ByCodeDevType","arg":""}]}, "requester":"HJ_Config"}',
          getInterface    : '{"nodeid":"*","opcode":"GET_CODE_LIB_UI_TEMPLATE","arg":{"codeLibId":""},"requester":"HJ_Config"}',
          matchCodeLib    : '{"nodeid":"","opcode":"MATCH_CLOUD_CODE_LIB","arg":{"codeDevType":""},"requester":"HJ_Server"}',
          testCodeLib     : '{"nodeid":"","opcode":"TEST_CODE_LIB","arg":{"codeLibId":"","codeId":""},"requester":"HJ_Server"}',
          updateDeviceCodeLib : '{"nodeid":"","opcode":"UPLOAD_CODE_LIB_TO_INFRARED_TRANSCEIVER", "arg":{"codeLibId":""}, "requester":"HJ_Server"}',
          resetDeviceCodeLib  : '{"nodeid":"","opcode":"RESET_INFRARED_TRANSCEIVER_CODE_LIB_BIND", "arg":"*", "requester":"HJ_Server"}',
          createCodeLib   : '{"nodeid":"","opcode":"CREATE_NEW_CODE_LIB", "arg":{"codeLibDevType":"", "codeLibDevBrand":"", "codeLibDevModel":"", "codeLibName":""}, "requester":"HJ_Server"}',
          getDeviceBindCodeLibList : '{"nodeid":"","opcode":"GET_CODE_LIB_BIND_INFRARED_TRANSCEIVERS", "arg":{"codeLibId":""}, "requester":"HJ_Config"}',
          deleteCodeLib   : '{"nodeid":"*","opcode":"DEL_LOCAL_CODE_LIB", "arg":{"codeLibId":""}, "requester":"HJ_Server"}',
          renameCodeLib   : '{"nodeid":"*","opcode":"RENAME_LOCAL_CODE_LIB", "arg":{"codeLibId":"","codeLibName":""}, "requester":"HJ_Config"}',
          getCodeLibStatus : '{"nodeid":"*", "opcode":"GET_CODE_LIB_WORKING_TASK", "arg":"*","requester":"HJ_Server"}'
        },
        operateAction    : {
          sendInfrared : '{"nodeid": "","opcode": "SEND_INFRARED_CODE", "arg":"","requester":"HJ_Server"}',
          smartSwitchOn : '{"nodeid": "","opcode": "CONTROLLER_SMART_SWITCH_ON","arg":"*", "requester":"HJ_Server"}',
          smartSwitchOff : '{"nodeid": "","opcode": "CONTROLLER_SMART_SWITCH_OFF","arg":"*", "requester":"HJ_Server"}'
        },
        infoAction : {
          getSocketId : '{ "nodeid": "","opcode": "GET_CONTROLLER_BIND_SMART_SOCKET", "arg":"*", "requester":"HJ_Config"}'
        },
        actionConversion : function(data) {
          return data + '';
        },
        IFTTTConditionConversion : function(data) {
          return data + '';
        }
      },
      "ZIGBEE_Outlet"               : {
        operateType     : "2001",
        operateStatus   : '{ "socketSwitch" : null , "power": null }',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              status.socketSwitch = null;
              status.power = "0";
              break;
            case "SWITCH":
              status.socketSwitch = data.arg;
              break;
            case "STATUS":
              status.socketSwitch = data.arg.switch;
              break;
            default:
              SHostLog.error("device type 2001 = ZIGBEE_Outlet, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : {
          switch        : '{"nodeid": "", "arg": "","requester":"HJ_Server","opcode": "SWITCH"}'
        },
        actionMap          : {
          "CYCLE" : "循环交替",
          "循环交替" : "CYCLE",
          "OFF" : "关",
          "ON"  : "开",
          "关"  : "OFF",
          "开"  : "ON"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionMap  : {
          "OFF" : "关",
          "ON"  : "开",
          "关"  : "OFF",
          "开"  : "ON"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_KonkeSocket"          : {
        operateType     : "2002",
        operateStatus   : '{ "socketSwitch" : null, "lightSwitch" : null, "power": null}',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              status.socketSwitch = null;
              status.lightSwitch  = null;
              status.power  = "0";
              break;
            case "SWITCH":
              status.socketSwitch = data.arg;
              break;
            case "STATUS":
              status.socketSwitch = data.arg.switch;
              status.lightSwitch  = data.arg.light_switch;
              break;
            case "ZB_LIGHT_SWITCH":
              status.lightSwitch  = data.arg;
              break;
            default:
              SHostLog.error("device type 2002 = ZIGBEE_KonkeSocket, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : {
          switch             : '{"nodeid": "", "arg": "", "requester": "HJ_Server", "opcode": "SWITCH"}',
          lightSwitch        : '{"nodeid": "", "arg": "", "requester": "HJ_Server", "opcode": "ZB_LIGHT_SWITCH"}'
        },
        actionMap          : {
          "CYCLE" : "循环交替",
          "循环交替" : "CYCLE",
          "OFF" : "关",
          "ON"  : "开",
          "LIGHT_OFF" : "小夜灯关",
          "LIGHT_ON"  : "小夜灯开",
          "关"  : "OFF",
          "开"  : "ON",
          "小夜灯关" : "LIGHT_OFF",
          "小夜灯开"  : "LIGHT_ON"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionMap  : {
          "OFF" : "关",
          "ON"  : "开",
          "LIGHT_OFF" : "小夜灯关",
          "LIGHT_ON"  : "小夜灯开",
          "关"  : "OFF",
          "开"  : "ON",
          "小夜灯关" : "LIGHT_OFF",
          "小夜灯开"  : "LIGHT_ON"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_Socket10A"            : {
        operateType     : "2003",
        operateStatus   : '{ "socketSwitch" : null , "power": null }',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              status.socketSwitch  = "OFF";
              status.power  = "0";
              break;
            case "SWITCH":
              status.socketSwitch = data.arg;
              break;
            case "STATUS":
              status.socketSwitch = data.arg.switch;
              break;
            default:
              SHostLog.error("device type 2003 = ZIGBEE_Socket10A, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : {
          switch        : '{"nodeid": "", "arg": "","requester":"HJ_Server","opcode": "SWITCH"}'
        },
        actionMap          : {
          "CYCLE" : "循环交替",
          "循环交替" : "CYCLE",
          "OFF" : "关",
          "ON"  : "开",
          "关"  : "OFF",
          "开"  : "ON"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionMap  : {
          "OFF" : "关",
          "ON"  : "开",
          "关"  : "OFF",
          "开"  : "ON"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_Socket16A"            : {
        operateType     : "2004",
        operateStatus   : '{ "socketSwitch" : null , "power": null }',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              status.socketSwitch  = "OFF";
              status.power  = "0";
              break;
            case "SWITCH":
              status.socketSwitch = data.arg;
              break;
            case "STATUS":
              status.socketSwitch = data.arg.switch;
              break;
            default:
              SHostLog.error("device type 2003 = ZIGBEE_Socket10A, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : {
          switch        : '{"nodeid": "", "arg": "","requester":"HJ_Server","opcode": "SWITCH"}'
        },
        actionMap          : {
          "CYCLE" : "循环交替",
          "循环交替" : "CYCLE",
          "OFF" : "关",
          "ON"  : "开",
          "关"  : "OFF",
          "开"  : "ON"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionMap  : {
          "OFF" : "关",
          "ON"  : "开",
          "关"  : "OFF",
          "开"  : "ON"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_Gateway"              : {
        operateType     : "2501",
        operateStatus : null,
        status : function(data) {return null;},
        configAction : {
          editName : '{"arg":"*","nodeid":"","opcode":"SET_GW_NAME","requester":"HJ_Config"}',
          delete : '{"arg":"*","nodeid":"","opcode":"DEL_GW","requester":"HJ_Server"}'
        },
        operateAction   : {
          "openNETChannel" : '{"nodeid": "","opcode": "OPEN_NET_CHANNEL", "arg": "*","requester":"HJ_Server"}'
        },
        actionConversion : function(data) {return null;},
        IFTTTConditionConversion : function(data) {return null;}
      },
      "ZIGBEE_InfraredSensor"       : {
        operateType     : "3001",
        operateStatus   : '{ "alarm" : null, "battery" : null, "lowPower": null, "dismantle" : null}',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "ALARM_ACTIVATED":
              if (data.arg == "0") {
                status.alarm = "1";
              }
              else if (data.arg == "1") {
                status.dismantle    = "1";
              }
              else if (data.arg == "2") {
                status.lowPower     = "1";
              }
              else {
                SHostLog.error('device type 3001 = ZIGBEE_InfraredSensor, can not discern alarm type.');
              }
              break;
            case "ALARM_DEACTIVATED":
              if (data.arg == "0") {
                status.alarm = "0";
              }
              else if (data.arg == "1") {
                status.dismantle    = "0";
              }
              else if (data.arg == "2") {
                status.lowPower     = "0";
              }
              else {
                SHostLog.error('device type 3001 = ZIGBEE_InfraredSensor, can not discern alarm type.');
              }
              break;
            case "SENSOR_BOOL":
              status.alarm      = data.arg;
              break;
            case "POWER_NOTIFY":
              status.battery      = data.arg;
              break;
            case "SENSOR_BOOL_STATUS":
              status.battery      = data.arg.battery;
              status.dismantle    = data.arg.alarm.dismantle;
              status.lowPower     = data.arg.alarm.low_power;
              status.alarm        = data.arg.alarm.normal;
              break;
            default:
              SHostLog.error("device type 3001 = ZIGBEE_InfraredSensor, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : null,
        actionMap          : null,
        actionConversion  : function(string) {
          return null;
        },
        IFTTTConditionMap  : {
          "触发" : "1",
          "不触发"  : "0",
          "0"  : "不触发",
          "1"  : "触发"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_SmokeSensor"          : {
        operateType     : "3002",
        operateStatus   : '{ "alarm" : null, "battery" : null, "lowPower": null, "dismantle" : null}',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "ALARM_ACTIVATED":
              if (data.arg == "0") {
                status.alarm = "1";
              }
              else if (data.arg == "1") {
                status.dismantle    = "1";
              }
              else if (data.arg == "2") {
                status.lowPower     = "1";
              }
              else {
                SHostLog.error('device type 3002 = ZIGBEE_SmokeSensor, can not discern alarm type.');
              }
              break;
            case "ALARM_DEACTIVATED":
              if (data.arg == "0") {
                status.alarm = "0";
              }
              else if (data.arg == "1") {
                status.dismantle    = "0";
              }
              else if (data.arg == "2") {
                status.lowPower     = "0";
              }
              else {
                SHostLog.error('device type 3002 = ZIGBEE_SmokeSensor, can not discern alarm type.');
              }
              break;
            case "SENSOR_BOOL":
              status.alarm      = data.arg;
              break;
            case "POWER_NOTIFY":
              status.battery      = data.arg;
              break;
            case "SENSOR_BOOL_STATUS":
              status.battery      = data.arg.battery;
              status.dismantle    = data.arg.alarm.dismantle;
              status.lowPower     = data.arg.alarm.low_power;
              status.alarm        = data.arg.alarm.normal;
              break;
            default:
              SHostLog.error("device type 3002 = ZIGBEE_SmokeSensor, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : null,
        actionMap          : null,
        actionConversion  : function(string) {
          return null;
        },
        IFTTTConditionMap  : {
          "触发" : "1",
          "不触发"  : "0",
          "0"  : "不触发",
          "1"  : "触发"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_GasSensor"            : {
        operateType     : "3003",
        operateStatus   : '{ "alarm" : null, "battery" : null, "lowPower": null, "dismantle" : null}',
        status : function(data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "ALARM_ACTIVATED":
              if (data.arg == "0") {
                status.alarm = "1";
              }
              else if (data.arg == "1") {
                status.dismantle    = "1";
              }
              else if (data.arg == "2") {
                status.lowPower     = "1";
              }
              else {
                SHostLog.error('device type 3003 = ZIGBEE_GasSensor, can not discern alarm type.');
              }
              break;
            case "ALARM_DEACTIVATED":
              if (data.arg == "0") {
                status.alarm = "0";
              }
              else if (data.arg == "1") {
                status.dismantle    = "0";
              }
              else if (data.arg == "2") {
                status.lowPower     = "0";
              }
              else {
                SHostLog.error('device type 3003 = ZIGBEE_GasSensor, can not discern alarm type.');
              }
              break;
            case "SENSOR_BOOL":
              status.alarm      = data.arg;
              break;
            case "POWER_NOTIFY":
              status.battery      = data.arg;
              break;
            case "SENSOR_BOOL_STATUS":
              status.battery      = data.arg.battery;
              status.dismantle    = data.arg.alarm.dismantle;
              status.lowPower     = data.arg.alarm.low_power;
              status.alarm        = data.arg.alarm.normal;
              break;
            default:
              SHostLog.error("device type 3003 = ZIGBEE_GasSensor, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction : null,
        operateAction : null,
        actionMap          : null,
        actionConversion  : function(string) {
          return null;
        },
        IFTTTConditionMap  : {
          "触发" : "1",
          "不触发"  : "0",
          "0"  : "不触发",
          "1"  : "触发"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_DipSensor"            : {
        operateType     : "3004",
        operateStatus   : '{ "alarm" : null, "battery" : null, "lowPower": null, "dismantle" : null, "probeFallOff" : null}',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "SENSOR_BOOL":
              status.alarm      = data.arg;
              break;
            case "ALARM_ACTIVATED":
              if (data.arg == "0") {
                status.alarm = "1";
              }
              else if (data.arg == "1") {
                status.dismantle    = "1";
              }
              else if (data.arg == "2") {
                status.lowPower     = "1";
              }
              else if (data.arg == "3") {
                status.probeFallOff = "1";
              }
              else {
                SHostLog.error('device type 3004 = ZIGBEE_DipSensor, can not discern alarm type.');
              }
              break;
            case "ALARM_DEACTIVATED":
              if (data.arg == "0") {
                status.alarm = "0";
              }
              else if (data.arg == "1") {
                status.dismantle    = "0";
              }
              else if (data.arg == "2") {
                status.lowPower     = "0";
              }
              else if (data.arg == "3") {
                status.probeFallOff = "0";
              }
              else {
                SHostLog.error('device type 3004 = ZIGBEE_DipSensor, can not discern alarm type.');
              }
              break;
            case "POWER_NOTIFY":
              status.battery      = data.arg;
              break;
            case "SENSOR_BOOL_STATUS":
              status.battery      = data.arg.battery;
              status.alarm        = data.arg.alarm.normal;
              status.lowPower     = data.arg.alarm.low_power;
              status.dismantle    = data.arg.alarm.dismantle;
              status.probeFallOff = data.arg.alarm.probe_fall_off;
              break;
            default:
              SHostLog.error("device type 3004 = ZIGBEE_DipSensor, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : null,
        actionMap         : null,
        actionConversion  : function(string) {
          return null;
        },
        IFTTTConditionMap : {
          "触发"    : "1",
          "不触发"  : "0",
          "0"  : "不触发",
          "1"  : "触发"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_DoorSensor"           : {
        operateType     : "3499",
        operateStatus   : '{ "status" : null, "battery" : null, "lowPower": null, "dismantle" : null}',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "ALARM_ACTIVATED":
              if (data.arg == "0") {
                status.status = "1";
              }
              else if (data.arg == "1") {
                status.dismantle    = "1";
              }
              else if (data.arg == "2") {
                status.lowPower     = "1";
              }
              else {
                SHostLog.error('device type 3499 = ZIGBEE_DoorSensor, can not discern alarm type.');
              }
              break;
            case "ALARM_DEACTIVATED":
              if (data.arg == "0") {
                status.status = "0";
              }
              else if (data.arg == "1") {
                status.dismantle    = "0";
              }
              else if (data.arg == "2") {
                status.lowPower     = "0";
              }
              else {
                SHostLog.error('device type 3004 = ZIGBEE_DipSensor, can not discern alarm type.');
              }
              break;
            case "SENSOR_BOOL_STATUS":
              status.status      = data.arg.alarm.normal == '0' ? "CLOSE":"OPEN";
              status.dismantle      = data.arg.alarm.dismantle;
              status.lowPower      = data.arg.alarm.low_power;
              status.battery      = data.arg.battery;
              break;
            case "SENSOR_BOOL":
              status.status      = data.arg == '0' ? "CLOSE":"OPEN";
              break;
            case "POWER_NOTIFY":
              status.battery      = data.arg;
              break;
            case "DOOR_CONTACT_NOTIFY":
              status.status = data.arg.status;
              break;
            case "DOOR_CONTACT_STATUS":
              status.status = data.arg.status;
              status.battery = data.arg.power;
              break;
            default:
              SHostLog.error("device type 3499 = ZIGBEE_DoorSensor, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : null,
        actionMap          : null,
        actionConversion  : function(string) {
          return null;
        },
        IFTTTConditionMap  : {
          "开" : "1",
          "关" : "0",
          "0"  : "开",
          "1"  : "关"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_ScenePanel"           : {
        operateType     : "3501",
        operateStatus : null,
        status : function (data) {
          return null;
        },
        configAction    : null,
        operateAction : {
          trigger : '{"arg":"ON","nodeid":"","opcode":"SWITCH","requester":"HJ_Profile"}'
        },
        actionConversion : function (data) {
          return null;
        },
        IFTTTConditionConversion : function(data) {
          return null;
        }
      },
      "ZIGBEE_SOSPanel"             : {
        operateType     : "3502",
        operateStatus : '{"alarm" : null }',
        status : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              status.alarm = null;
              break;
            case "SOS_ACTIVED":
              status.alarm = "1";
              break;
            case "CLEAR_SOS_ALARM":
              status.alarm = "0";
              break;
            default:
              SHostLog.warn("device type 3502 = ZIGBEE_SOSPanel, unknown opcode : \n" + data.opcode);
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction : {
          cancelAlarm : '{"nodeid": "","opcode": "CLEAR_SOS_ALARM","arg": "*","requester":"HJ_Server"}'
        },
        actionConversion : function (data) {
          return null;
        },
        IFTTTConditionMap : {
          "触发" : "1",
          "1" : "触发"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_Lock800"              : {
        operateType : "4501",
        operateStatus : '{"status" : null, "battery" : null, "alarm" : null}',
        status : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "SWITCH":
              status.status = (data.arg == "ON") ? "OPEN" : "CLOSE";
              break;
            case "LOCK_ALARM":
              status.alarm = data.arg;
              break;
            case "POWER_NOTIFY":
              status.battery = data.arg;
              break;
            case "LOCK_STATUS":
              status.alarm = data.arg.alarm;
              status.status = (data.arg.lock == "0") ? "OPEN" : "CLOSE";
              status.battery = data.arg.battery;
              break;
            default:
              SHostLog.warn("device type 4501 = ZIGBEE_Lock800, unknown opcode : \n" + data.opcode);
              break;
          }

          return status;
        },
        configAction : null,
        operateAction : {
          openLock : '{"nodeid": "","opcode": "SWITCH","arg": {"password":"","status":"ON"},"requester":"HJ_Server"}'
        },
        actionConversion : function (data) {
          return null;
        },
        IFTTTConditionMap : {
          "OFF" : "关",
          "ON"  : "开",
          "关"  : "OFF",
          "开"  : "ON"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_KonkeLock"            : {
        operateType : "4502",
        operateStatus : '{"status" : null, "battery" : null, "alarm" : null}',
        status : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "SWITCH":
              status.status = (data.arg == "ON") ? "OPEN" : "CLOSE";
              break;
            case "LOCK_ALARM":
              status.alarm = data.arg;
              break;
            case "POWER_NOTIFY":
              status.battery = data.arg;
              break;
            case "LOCK_STATUS_NOTIFY":
              status.status = data.arg.door_status;
              status.battery = data.arg.power;
              break;
            default:
              SHostLog.warn("device type 4502 = ZIGBEE_KonkeLock, unknown opcode : \n" + data.opcode);
              break;
          }

          return status;
        },
        configAction : {
          synchTime : '{"nodeid": "","opcode": "SYNC_LOCK_TIME","arg": "2017-01-01 8:00:00","requester":"HJ_Server"}',
          getUserInfo : '{"nodeid": "","opcode": "LOCK_USER","arg": "*","requester":"HJ_Config"}',
          getOpenLog : '{"nodeid": "","opcode": "LOCK_OPEN_LOG","arg": "*","requester":"HJ_Config"}',
          setUserName : '{"nodeid": "","opcode": "LOCK_USER_NICKNAME","arg": {"userid":"","open_type":"","user_nickname":""},"requester":"HJ_Config"}}'
        },
        operateAction : {
          openLock : '{"nodeid": "","opcode": "SWITCH","arg": {"password":"","status":"ON"},"requester":"HJ_Server"}'
        },
        actionConversion : function(data) {
          return null;
        },
        IFTTTConditionMap : {
          "OFF" : "关",
          "ON"  : "开",
          "关"  : "OFF",
          "开"  : "ON"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_TempSensor"           : {
        operateType     : "10001",
        operateStatus   : '{ "value" : null, "type" : "℃"}',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              status.value = "-100";
              break;
            case "SENSOR_NUMERICAL":
              status.value = Number(data.arg).toFixed(1);
              break;
            default:
              SHostLog.error("device type 10001 = ZIGBEE_TempSensor, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : null,
        actionMap          : null,
        actionConversion  : function(string) {
          return null;
        },
        IFTTTConditionMap  : null,
        IFTTTConditionConversion : function(string) {
          if (typeof string === 'string') {
            return string;
          }
          if (typeof string === 'number') {
            return string + "";
          }
          return 'undefined';
        }
      },
      "ZIGBEE_HumiSensor"           : {
        operateType     : "10002",
        operateStatus   : '{ "value" : null, "type" : "%"}',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              status.value = "0";
              break;
            case "SENSOR_NUMERICAL":
              status.value = Number(data.arg).toFixed(1);
              break;
            default:
              SHostLog.error("device type 10002 = ZIGBEE_HumiSensor, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : null,
        actionMap          : null,
        actionConversion  : function(string) {
          return null;
        },
        IFTTTConditionMap  : null,
        IFTTTConditionConversion : function(string) {
          if (typeof string === 'string') {
            return string;
          }
          if (typeof string === 'number') {
            return string + "";
          }
          return 'undefined';
        }
      },
      "ZIGBEE_IllumSensor"          : {
        operateType     : "10003",
        operateStatus   : '{ "value" : null, "grade" : null, "type" : "Lux"}',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              status.value = "0";
              break;
            case "SENSOR_NUMERICAL":
              status.value = Number(data.arg).toFixed(1);
              break;
            case "ILLUMINOMETER_GRADE":
              status.grade = data.arg;
              break;
            case "ILLUMINOMETER_NUMERICAL":
              status.value = Number(data.arg.illumination).toFixed(1);
              status.grade = data.arg.grade;
              break;
            default:
              SHostLog.error("device type 10003 = ZIGBEE_IllumSensor, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : null,
        operateAction   : null,
        actionMap          : null,
        actionConversion  : function(string) {
          return null;
        },
        IFTTTConditionMap  : {
          "DARK"   : "黑夜",
          "DIM"    : "暗淡",
          "NORMAL" : "正常",
          "BRIGHT" : "明亮",
          "黑夜" : "DARK",
          "暗淡" : "DIM",
          "正常" : "NORMAL",
          "明亮" : "BRIGHT"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "ZIGBEE_Alertor"              : {
        operateType     : "11001",
        operateStatus   : '{"valve":null,"alarm":null,"sound":null,"power":null,"battery":null}',
        status : function(data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "OPEN_ALERTOR":
              status.valve = "ON";
              break;
            case "CLOSE_ALERTOR":
              status.valve = "OFF";
              break;
            case "ZIGBEE_ALERTOR_STATUS":
              status.alarm = data.arg.alarm;
              status.sound = data.arg.alarm;
              status.power = data.arg.alarm;
              status.battery = data.arg.alarm;
              break;
            default:
              SHostLog.warn("device type 11001 = ZIGBEE_Alertor, unknown opcode : \n" + data.opcode);
              break;
          }

          return status;
        },
        configAction : null,
        operateAction : {
          open : '{"nodeid": "","opcode": "OPEN_ALERTOR","arg": "*","requester":"HJ_Server"}',
          close : '{"nodeid": "","opcode": "CLOSE_ALERTOR","arg": "*","requester":"HJ_Server"}'
        },
        actionMap         : {
          "OFF" : "关",
          "ON"  : "开",
          "关"  : "OFF",
          "开"  : "ON"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionMap  : null,
        IFTTTConditionConversion : function(data) {return null;}
      },
      "ZIGBEE_ShortcutPanel"        : {
        operateType     : "11501",
        operateStatus   : '{"battery":null, "toggleButton":null}',
        status          : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "POWER_NOTIFY":
              status.battery = data.arg;
              break;
            case "SHORTCUT_PANEL_ACTIVE":
              status.toggleButton = data.arg;
              break;
            case "SHORTCUT_PANEL_ACTIVE_PUSH":
              status.toggleButton = data.arg;
              break;
            default:
              SHostLog.error("device type 11501 = ZIGBEE_ShortcutPanel, message : \n" + JSON.stringify(data));
              break;
          }

          return status;
        },
        configAction    : {
          configPanelAction : '{"nodeid":"","opcode":"SET_SHORTCUT_PANEL_ACTIONS", "arg":[{"button_id":"", "action":{"nodeid":"","operate_type":"", "operation":"", "room_id":""}}], "requester":"HJ_Config"}'
        },
        operateAction   : {
          activate : '{"nodeid": "","opcode": "SHORTCUT_PANEL_ACTIVE","arg": "","requester":"HJ_Server"}'
        },
        actionMap          : null,
        actionConversion  : function(data) {return null;},
        IFTTTConditionMap  : null,
        IFTTTConditionConversion : function(data) {return null;}
      },

      "NET_HueLight"        : {
        operateType     : "-4",
        operateStatus   : '{"switch":null, "xy":null, "brightness":null}',
        status : function(data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "OPT_HUE_LIGHT" :
              status.switch = data.arg.on ? "ON" : "OFF";
              status.xy = data.arg.xy;
              status.brightness = data.arg.bri;
              break;
            default:
              SHostLog.warn("device type -4 = NET_HueLight, unknown opcode : \n" + data.opcode);
              break;
          }

          return status;
        },
        configAction : {
          activeGateWay : '{"arg":"*","nodeid":"","opcode":"ACTIVE_HUE_GW","requester":"HJ_Hue"}',
          openGateWay : '{"arg":"*","nodeid":"","opcode":"OPEN_HUE_GW_NET","requester":"HJ_Hue"}',
          editDevice : '{"arg":{"name":"","room_id":"","icon":""},"nodeid":"","opcode":"SET_HUE_LIGHT", "requester":"HJ_Config"}',
          deleteDevice : '{"arg":"*","nodeid":"","opcode":"DEL_HUE_LIGHT","requester":"HJ_Hue"}'
        },
        operateAction : {
          setLight : '{"arg":{"on":"","xy":"","bri":""},"nodeid":"","opcode":"OPT_HUE_LIGHT","requester":"HJ_Hue"}'
        },

        actionConversion  : function(obj) {
          if (typeof obj !== 'object') {
            return "undefined";
          }
          else {
            if (MethodServices.isArray(obj) || obj == null) {
              return "undefined";
            }
          }

          var tempObject = new Object();
          tempObject.switch = (obj.on == "ON") ? true : false;
          tempObject.xy = obj.xy;
          tempObject.bri = obj.brightness;
          return tempObject;
        },
        IFTTTConditionConversion  : function(data) {
          return null;
        }
      },

      "NET_KonkeSocket"     : {
        operateType     : "-5",
        operateStatus   : '{"switch":null,"USBSwitch":null,"lightSwitch":null,"online":null}',
        status          : function(data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "SOCKET_SWITCH":
              status.switch = data.arg;
              break;
            case "LIGHT_SWITCH":
              status.lightSwitch = data.arg;
              break;
            case "USB_SWITCH":
              status.USBSwitch = data.arg;
              break;
            case "KONKE_SOCKET_ONLINE_STATUS":
              status.online = (data.arg == "1") ? "ON" : "OFF";
              break;
            case "KONKE_SOCKET_STATUS":
              status.switch = data.arg.socket_switch_on ? "ON" : "OFF";
              status.USBSwitch = data.arg.usb_switch_on ? "ON" : "OFF";
              status.lightSwitch = data.arg.light_switch_on ? "ON" : "OFF";
              break;
            default:
              SHostLog.warn("device type -5 = NET_KonkeSocket, unknown opcode : \n" + data.opcode);
              break;
          }

          return status;
        },
        configAction    : {
          editSocket : '{"arg":{"name":"","room_id":""},"nodeid":"","opcode":"SET_KONKE_SOCKET", "requester":"HJ_Config"}',
          deleteSocket : '{"arg":"*","nodeid":“”,"opcode":"DEL_KONKE_SOCKET","requester":"HJ_KonKe"}'
        },
        operateAction   : {
          switch : '{"arg":"","nodeid":"","opcode":"SOCKET_SWITCH","requester":"HJ_KonKe"}',
          lightSwitch : '{"arg":"","nodeid":"","opcode":"LIGHT_SWITCH","requester":"HJ_KonKe"}',
          USBSwitch : '{"arg":"","nodeid":"","opcode":"USB_SWITCH","requester":"HJ_KonKe"}'
        },
        actionMap          : {
          "插座开" : "ON",
          "插座关" : "OFF",
          "小夜灯开" : "LIGHT_ON",
          "小夜灯关" : "LIGHT_OFF",
          "ON"  : "插座开",
          "OFF" : "插座关",
          "LIGHT_ON"  : "小夜灯开",
          "LIGHT_OFF" : "小夜灯关"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionMap   : {
          "插座开" : "ON",
          "插座关" : "OFF",
          "小夜灯开" : "LIGHT_ON",
          "小夜灯关" : "LIGHT_OFF",
          "ON"  : "插座开",
          "OFF" : "插座关",
          "LIGHT_ON"  : "小夜灯开",
          "LIGHT_OFF" : "小夜灯关"
        },
        IFTTTConditionConversion : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.IFTTTConditionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.IFTTTConditionMap[string];
          }
        }
      },
      "NET_KonkeLight"      : {
        operateType     : "-6",
        operateStatus   : '{"switch":null,"rgb":null,"brightness":null,"model":null, "speed":null, "online":null}',
        status          : function(data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "SET_KONKE_LIGHT_PARAMS":
              status.switch = (data.arg.on) ? "ON" : "OFF";
              status.rgb = data.arg.rgb;
              status.brightness = data.arg.bri;
              break;
            case "SET_KONKE_LIGHT_MODEL":
              status.model = data.arg.model;
              status.speed = data.arg.model_arg.speed;
              break;
            case "KONKE_LIGHT_ONLINE_STATUS":
              status.online = (data.arg == "1") ? "ON" : "OFF";
              break;
            case "KONKE_LIGHT_STATUS":
              status.switch = (data.arg.on) ? "ON" : "OFF";
              status.rgb = data.arg.rgb;
              status.brightness = data.arg.bri;
              status.model = data.arg.model;
              status.speed = data.arg.speed;
              break;
            default:
              SHostLog.warn("device type -6 = NET_KonkeLight, unknown opcode : \n" + data.opcode);
              break;
          }

          return status;
        },
        configAction    : {
          editLight : '{"arg":{"name":"","room_id":""},"nodeid":"","opcode":"SET_KONKE_LIGHT","requester":"HJ_Config"}',
          deleteLight : '{"arg":"*","nodeid":"","opcode":"DEL_KONKE_LIGHT","requester":"HJ_KonKe"}'
        },
        operateAction   : {
          setLight : '{"arg":{"on":"","rgb":"","bri":""},"nodeid":"","opcode":"SET_KONKE_LIGHT_PARAMS", "requester":"HJ_KonKe"}',
          setModel : '{"nodeid":"","opcode":"SET_KONKE_LIGHT_MODEL","arg":{"model":"FLOW","model_arg":{"speed":""}},"requester":"HJ_KonKe"}'
        },
        actionConversion  : function(obj) {
          if (typeof obj !== 'object') {
            return "undefined";
          }
          else {
            if (MethodServices.isArray(obj) || obj == null) {
              return "undefined";
            }
          }

          var tempObject = new Object();
          tempObject.switch = (obj.on == "ON") ? true : false;
          tempObject.rgb = obj.rgb;
          tempObject.bri = obj.brightness;
          return tempObject;
        },
        IFTTTConditionConversion  : function(data) {
          return null;
        }
      },

      "NET_CnWiseMusicHost" : {
        operateType     : "-8",
        operateStatus   : '{"switch":null, "xy":null, "brightness":null}',
        status : function (data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            default:
              SHostLog.warn("device type -8 = NET_CnWiseMusicHost, unknown opcode : \n" + data.opcode);
              break;
          }

          return status;
        },
        configAction : {},
        operateAction : {

        },
        infoAction : {
          getStatus : '{"nodeid":"","opcode":"GET_CNWISE_MUSIC_STATUS","arg":"*","requester":"HJ_CnWise"}',
          getMusicList : '{"nodeid":"","opcode":"GET_CNWISE_MUSIC_LIST","arg":"*","requester":"HJ_CnWise"}',

        },

        actionConversion  : function(obj) {
          return null;
        },
        IFTTTConditionConversion  : function(data) {
          return null;
        }
      },

      "NET_KonkeHumidifier" : {
        operateType   : "-10",
        operateStatus : '{"online":null, "status":null, "quantity":null, "moisturize":{"on":null, "quantity":null}}',
        status : function(data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "KONKE_HUMIDIFIER_SWITCH":
              status.status = data.arg;
              break;
            case "ADJUST_KONKE_HUMIDIFIER_FOGVOL":
              status.quantity = data.arg;
              break;
            case "SET_KONKE_HUMIDIFIER_CONSTANDWET":
              status.moisturize.on = data.arg.on ? "ON" : "OFF";
              status.moisturize.quantity = data.arg.vol;
              break;
            case "KONKE_HUMIDIFIER_ONLINE_STATUS":
              status.online = (data.arg == "1") ? "ON" : "OFF";
              break;
            case "KONKE_HUMIDIFIER_STATUS":
              status.status = data.arg.status;
              status.quantity = data.arg.fog_vol;
              status.moisturize.on = data.arg.constand_wet.on ? "ON" : "OFF";
              status.moisturize.quantity = data.arg.constand_wet.vol;
              break;
            default:
              SHostLog.warn("device type -10 = NET_KonkeHumidifier, unknown opcode : \n" + data.opcode);
              break;
          }

          return status;
        },
        configAction  : {
          editHumidifier : '{"arg":{"name":"","room_id":""},"nodeid":"","opcode":"SET_KONKE_HUMIDIFIER", "requester":"HJ_Config"}',
          deleteHumidifier : '{"arg":"*","nodeid":"","opcode":"DEL_KONKE_HUMIDIFIER","requester":"HJ_KonKe"}'
        },
        operateAction : {
          switch : '{ "arg":"", "nodeid":"","opcode":"KONKE_HUMIDIFIER_SWITCH", "requester":"HJ_KonKe"}',
          quantity : '{"nodeid":"","opcode":"ADJUST_KONKE_HUMIDIFIER_FOGVOL", "arg":"","requester":"HJ_KonKe"}',
          moisturize : '{"nodeid":"","opcode":"SET_KONKE_HUMIDIFIER_CONSTANDWET", "arg":{"on":null,"vol":""}, "requester":"HJ_KonKe"}'
        },
        actionMap         : {
          "OFF" : "关",
          "ON"  : "开",
          "关"  : "OFF",
          "开"  : "ON"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionConversion  : function(data) {
          return null;
        }
      },
      "NET_KonkeAircleaner" : {
        operateType   : "-11",
        operateStatus : '{"online":null, "switch":null, "anion":null, "wind":null, "amount":null, "autoMode":null, "sleepMode":null,"quality":null,"AQI":null}',
        status : function(data) {
          var status = JSON.parse(this.operateStatus);
          switch (data.opcode) {
            case "DEFAULT":
              break;
            case "KONKE_AIRCLEANER_SWITCH":
              status.switch = data.arg;
              break;
            case "SET_KONKE_AIRCLEANER_MODEL":
              if (data.arg == "AUTO") {
                status.autoMode = "ON";
                status.sleepMode = "OFF";
              }
              else if (data.arg == "SLEEP") {
                status.autoMode = "OFF";
                status.sleepMode = "ON";
              }
              else {
                status.autoMode = "OFF";
                status.sleepMode = "OFF";
              }
              break;
            case "KONKE_AIRCLEANER_ANION_SWITCH":
              status.anion = data.arg;
              break;
            case "SET_KONKE_AIRCLEANER_WIND_VOL":
              status.wind = data.arg;
              break;
            case "KONKE_AIRCLEANER_ONLINE_STATUS":
              status.online = (data.arg == "1") ? "ON" : "OFF";
              break;
            case "KONKE_AIRCLEANER_STATUS":
              status.switch = data.arg.on ? "ON" : "OFF";
              status.anion = data.arg.anion ? "ON" : "OFF";
              status.wind = data.arg.wind;
              status.amount = data.arg.air_vol;
              status.quality = data.arg.air_quality;
              status.AQI = data.arg.air_index;
              if (data.arg.auto_mode_on) {
                status.autoMode = "ON";
                status.sleepMode = "OFF";
              }
              else {
                status.autoMode = "OFF";
                if (data.arg.sleep_mode_on) {
                  status.sleepMode = "ON";
                }
                else {
                  status.sleepMode = "OFF";
                }
              }
              break;
            default:
              SHostLog.warn("device type -11 = NET_KonkeAircleaner, unknown opcode : \n" + data.opcode);
              break;
          }

          return status;
        },
        configAction  : {
          editAircleaner : '{"arg":{"name":"","room_id":""},"nodeid":"","opcode":"SET_KONKE_AIRCLEANER", "requester":"HJ_Config"}',
          deleteAircleaner : '{"arg":"*","nodeid":"","opcode":"DEL_KONKE_AIRCLEANER","requester":"HJ_KonKe"}'
        },
        operateAction : {
          switch : '{"arg":"","nodeid":"","opcode":"KONKE_AIRCLEANER_SWITCH", "requester":"HJ_KonKe"}',
          setMode : '{"nodeid":"","opcode":"SET_KONKE_AIRCLEANER_MODEL", "arg":"", "requester":"HJ_KonKe"}',
          switchAnion : '{"nodeid":"","opcode":"KONKE_AIRCLEANER_ANION_SWITCH", "arg":"", "requester":"HJ_KonKe"}',
          setWind : '{"nodeid":"","opcode":"SET_KONKE_AIRCLEANER_WIND_VOL", "arg":"", "requester":"HJ_KonKe"}'
        },
        actionMap         : {
          "OFF" : "关",
          "ON"  : "开",
          "关"  : "OFF",
          "开"  : "ON"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionConversion  : function(data) {
          return null;
        }
      },

      "VIRTUAL_ZONE_LIGHT"   : {
        operateType : "0",
        operateStatus : null,
        status : function(data) {return null;},
        configAction : null,
        operateAction : {
          allOn  : '{"nodeid": "*","opcode": "ALL_LIGHTS_ON",  "arg": "*","requester":"HJ_Server"}',
          allOff : '{"nodeid": "*","opcode": "ALL_LIGHTS_OFF", "arg": "*","requester":"HJ_Server"}'
        },
        actionMap : {
          "全开" : "ALL_OPEN",
          "全关" : "ALL_CLOSE",
          "ALL_CLOSE" : "全关",
          "ALL_OPEN"  : "全开"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionConversion : function(data) {return null;}
      },
      "VIRTUAL_ZONE_CURTAIN" : {
        operateType : "-9",
        operateStatus : null,
        status : function(data) {return null;},
        configAction : null,
        operateAction : {
          allOpen  : '{"nodeid": "*","opcode": "ALL_CURTAINS_OPEN",  "arg": "*","requester":"HJ_Server"}',
          allClose : '{"nodeid": "*","opcode": "ALL_CURTAINS_CLOSE", "arg": "*","requester":"HJ_Server"}',
          allStop  : '{"nodeid": "*","opcode": "ALL_CURTAINS_STOP",  "arg": "*","requester":"HJ_Server"}'
        },
        actionMap : {
          "全开" : "ALL_OPEN",
          "全关" : "ALL_CLOSE",
          "全停" : "ALL_STOP",
          "ALL_STOP"  : "全停",
          "ALL_CLOSE" : "全关",
          "ALL_OPEN"  : "全开"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionConversion : function(data) {return null;}
      },
      "VIRTUAL_Scene"        : {
        operateType     : "-2",
        operateStatus   : null,
        status          : function(data) {
          return null;
        },
        configAction    : {
          addScene        : '{"arg": {"scene_type":"","name":"","room_id":""}, "nodeid":"*","opcode":"ADD_SCENE","requester":"HJ_Config"}',
          editScene       : '{"arg": {"scene_type":"","name":"","room_id":""}, "nodeid":"*","opcode":"UPDATE_SCENE","requester":"HJ_Config"}',
          deleteScene     : '{"arg": "", "nodeid":"","opcode":"DELETE_SCENE","requester":"HJ_Config"}',
          setSceneTimer   : '{"arg":[{"enable":"", "week":"", "time":""}],"nodeid":"","opcode":"SET_TIMER","requester":"HJ_Profile"}',
          editSceneAction : '{"arg":{"actions":[]}, "nodeid":"","opcode":"SET_SCENE_ACTIONS", "requester":"HJ_Config"}',
          bindScenePanel  : '{"arg":{"scene_id":""}, "nodeid":"", "opcode":"BIND_SCENE_PANEL","requester":"HJ_Config"}'
        },
        operateAction   : {
          execute        : '{"arg":"ON","nodeid":"","opcode":"SWITCH","requester":"HJ_Profile"}'
        },
        actionMap          : {
          "EXECUTE" : "触发",
          "触发"  : "EXECUTE"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionConversion  : function(data) {
          return null;
        }
      },
      "VIRTUAL_IFTTT_Rule"   : {
        operateType     : "-1",
        operateStatus   : null,
        status          : function(data) {
          return null;
        },
        configAction    : {
          addIFTTT       : '{"arg":{"rule_condtions":[],"room_id":"","rule_results":[], "rule_type" : "rule","rule_enable":"","notification_use":"", "rule_name":""},"requester":"HJ_Config","opcode":"ADD_RULE","nodeid":"*"}',
          updateIFTTT    : '{"arg":{"rule_condtions":[],"room_id":"","rule_results":[], "rule_type" : "rule","rule_enable":"","notification_use":"", "rule_name":""},"requester":"HJ_Config","opcode":"UPDATE_RULE","nodeid":"*"}',
          addEXIFTTT     : '{"arg":{"rule_or_condtions":[],"rule_limit_condtions":[],"room_id":"","rule_results":[], "rule_type" : "expand_rule","rule_enable":"","notification_use":"", "rule_name":""},"requester":"HJ_Config","opcode":"ADD_EX_RULE","nodeid":"*"}',
          updateEXIFTTT  : '{"arg":{"rule_or_condtions":[],"rule_limit_condtions":[],"room_id":"","rule_results":[], "rule_type" : "expand_rule","rule_enable":"","notification_use":"", "rule_name":""},"requester":"HJ_Config","opcode":"UPDATE_EX_RULE","nodeid":"*"}',
          deleteIFTTT    : '{"arg":"*","nodeid":"","opcode":"DELETE_RULE", "requester":"HJ_Config"}',
          enableIFTTT    : '{"arg":"*","nodeid":"","opcode":"ENABLE_RULE", "requester":"HJ_Config"}',
          disableIFTTT   : '{"arg":"*","nodeid":"","opcode":"DISABLE_RULE", "requester":"HJ_Config"}'
        },
        operateAction   : null,
        actionMap          : {
          "ENABLE"  : "启用",
          "DISABLE" : "禁用",
          "启用"  : "ENABLE",
          "禁用"  : "DISABLE"
        },
        actionConversion  : function(string) {
          if (typeof string !== 'string') {
            return "undefined";
          }

          if (typeof this.actionMap[string] === "undefined") {
            return "undefined";
          }
          else {
            return this.actionMap[string];
          }
        },
        IFTTTConditionConversion  : function(data) {
          return null;
        }
      }
    },

    getDeviceObjectByName : function (deviceName) {
      if (typeof deviceName !== 'string') {
        return this.hostDevicesTypeMap["*"];
      }

      if (typeof this.hostDevicesTypeMap[deviceName] === "undefined") {
        return this.hostDevicesTypeMap["*"];
      }
      else {
        return this.hostDevicesTypeMap[deviceName];
      }
    }
  };

  var SHOST_DEVICE_DEFAULT_STATUS = {"opcode":"DEFAULT"};

  var SHOST_DEVICE_CONFIG_ACTION  = "configAction";
  var SHOST_DEVICE_OPERATE_ACTION = "operateAction";

  var SHOST_IFTTT_COMPARE_TYPE = {
    CompareTypeMap  : {
      "1"  : "相等",
      "2"  : "大于",
      "3"  : "小于",
      "相等"  : "1",
      "大于"  : "2",
      "小于"  : "3"
    },
    conversion : function(string) {
      if (typeof string !== 'string') {
        return null;
      }

      if (typeof this.CompareTypeMap[string] === "undefined") {
        return null;
      }
      else {
        return this.CompareTypeMap[string];
      }
    }
  };

  /**
   * #####################################################
   * 解析中控主机 operate type 与 设备名称的转换
   * @type {{}}
   * #####################################################
   */
  var SHOST_DEVICES_OPERATE_TYPE = {
    hostDevicesOperateTypeMap : {
      "-11"      : "NET_KonkeAircleaner",
      "niap"     : "NET_KonkeAircleaner",
      "-10"      : "NET_KonkeHumidifier",
      "h8002"    : "NET_KonkeHumidifier",
      "-9"       : "VIRTUAL_ZONE_CURTAIN",
      "-8"       : "NET_CnWiseMusicHost",
      //"-7"       : "VIRTUAL_SOS_SYSTEM",
      "-6"       : "NET_KonkeLight",
      "klight"   : "NET_KonkeLight",
      "-5"       : "NET_KonkeSocket",
      "k2pro"    : "NET_KonkeSocket",
      "-4"       : "NET_HueLight",
      //"-3"       : "VIRTUAL_GUARD_SYSTEM",
      "-2"       : "VIRTUAL_Scene",
      "scene"    : "VIRTUAL_Scene",
      "-1"       : "VIRTUAL_IFTTT_Rule",
      "ifttt"    : "VIRTUAL_IFTTT_Rule",
      "0"        : "VIRTUAL_ZONE_LIGHT",
      "1"        : "ZIGBEE_Light",
      "1001"     : "ZIGBEE_CurtainMotor",
      "1002"     : "ZIGBEE_RollingDoor",
      "1003"     : "ZIGBEE_DOOYAMotor",
      "1501"     : "ZIGBEE_InfraredTransponder",
      "1502"     : "ZIGBEE_InfraredEmitter",
      "2001"     : "ZIGBEE_Outlet",
      "2002"     : "ZIGBEE_KonkeSocket",
      "2003"     : "ZIGBEE_Socket10A",
      "2004"     : "ZIGBEE_Socket16A",
      "2501"     : "ZIGBEE_Gateway",
      "3001"     : "ZIGBEE_InfraredSensor",
      "3002"     : "ZIGBEE_SmokeSensor",
      "3003"     : "ZIGBEE_GasSensor",
      "3004"     : "ZIGBEE_DipSensor",
      "3499"     : "ZIGBEE_DoorSensor",
      "3501"     : "ZIGBEE_ScenePanel",
      "3502"     : "ZIGBEE_SOSPanel",
      "4501"     : "ZIGBEE_Lock800",
      "4502"     : "ZIGBEE_KonkeLock",
      "10001"    : "ZIGBEE_TempSensor",
      "10002"    : "ZIGBEE_HumiSensor",
      "10003"    : "ZIGBEE_IllumSensor",
      //"10004"    : "ZIGBEE_CO2Sensor",
      //"10005"    : "ZIGBEE_FormalSensor",
      //"10006"    : "ZIGBEE_PM25Sensor",
      "11001"    : "ZIGBEE_Alertor",
      "11501"    : "ZIGBEE_ShortcutPanel",
      'undefined'         : 'undefined'
    },

    getSHostDeviceNameByOperateType : function (operateType) {
      var operate = '';
      if (typeof operateType === 'string') {
        operate = operateType;
      }
      else if (typeof operateType === 'number') {
        operate = operateType + '';
      }
      else {
        return "undefined";
      }

      if (typeof this.hostDevicesOperateTypeMap[operate] === "undefined") {
        return "undefined";
      }
      else {
        return this.hostDevicesOperateTypeMap[operate];
      }
    }
  };

  /**
   * #####################################################
   * SHost Object
   * #####################################################
   */
  /**
   * 主机对象
   * @constructor
   */
  function SHost(ip, wanStatus, cloudStatus, gateWayList, hueGatewayList) {
    this.ip = ip;
    this.wanStatus = wanStatus;
    this.cloudStatus = cloudStatus;
    this.gatewayList = gatewayList;
    this.hueGatewayList = hueGatewayList;
  }

  /**
   * 主机网关对象
   * @constructor
   */
  function SHost_Gateway(id, ip, name, type, link) {
    this.id = id;
    this.ip = ip;
    this.name = name;
    this.link = link;
    this.deviceType = "ZIGBEE_Gateway";
  }

  /**
   * 主机网关对象
   * @constructor
   */
  function SHost_HueGateway(id, ip, name, type, link, active) {
    this.id = id;
    this.ip = ip;
    this.name = name;
    this.link = link;
    this.active = active;
    this.deviceType = "NET_HueGateway";
  }

  /**
   * 主机楼层对象
   * @param id number
   * @param name string
   * @constructor
   */
  function SHost_Floor(id, name) {
    this.id = id;
    this.name = name;
  }

  /**
   * 主机房间对象
   * @param id number
   * @param name string
   * @param floorId number
   * @constructor
   */
  function SHost_Room(id, name, floorId, icon) {
    this.id = id;
    this.name = name;
    this.floorId = floorId;
    this.icon = icon;
  }

  /**
   * 主机设备对象
   * @param id number
   * @param roomId number
   * @param name string
   * @param deviceType string
   * @param status object
   * @constructor
   */
  function SHost_Device(id, name, mac, roomId, deviceType, icon, status) {
    this.id = id;
    this.mac = mac;
    this.name = name;
    this.roomId = roomId;
    this.deviceType = deviceType;
    this.icon = icon;
    this.status = status;
  }

  /**
   * 主机情景模式对象
   * @param id number
   * @param name string
   * @param roomId number
   * @param timerEnable boolean
   * @param timerTime string
   * @param timerWeeks array (number)
   * @param pannelId array (number)
   * @param actions array (object SHost_Action)
   * @constructor
   */
  function SHost_Scene(id, name, roomId, timerEnable, timerTime, timerWeeks, pannelId, actions, sceneType) {
    this.id = id;
    this.name = name;
    this.roomId = roomId;
    this.timerEnable = timerEnable;
    this.timerTime = timerTime;
    this.timerWeeks = timerWeeks;
    this.pannelId = pannelId;
    this.actions = actions;
    this.sceneType = sceneType;
  }

  /**
   * 主机 情景模式 / IFTTT规则 中动作对象
   * @param id number
   * @param name string
   * @param roomId number
   * @param actionType object deviceType
   * @param delay string
   * @constructor
   */
  function SHost_Action(id, area, name, roomId, actionType, delay, operation) {
    this.id = id;
    this.area = area;
    this.name = name;
    this.roomId = roomId;
    this.operation = operation;
    this.deviceType = actionType;
    this.delay = delay;
  }

  /**
   * 主机IFTTT对象
   * @param id
   * @param name
   * @param roomId
   * @param type
   * @param notificationEnable
   * @param ruleEnable
   * @param conditionList
   * @param actionList
   * @constructor
   */
  function SHost_IFTTT(id, name, roomId, type, notificationEnable, ruleEnable, conditionList, actionList) {
    this.id = id;
    this.name = name;
    this.roomId = roomId;
    this.type = 'rule';
    this.notificationEnable = notificationEnable;
    this.ruleEnable = ruleEnable;
    this.conditionList = conditionList;
    this.actionList = actionList;
  }

  /**
   * 主机IFTTT条件对象
   * @param id
   * @param name
   * @param roomId
   * @param area
   * @param deviceType
   * @param compareType
   * @param leftValue
   * @param rightValue
   * @constructor
   */
  function SHost_IFTTTCondition(id, name, roomId, area, deviceType, compareType, leftValue, rightValue, deivceIcon) {
    this.id = id;
    this.name = name;
    this.roomId = roomId;
    this.area = area;
    this.deviceType = deviceType;
    this.compareType = compareType;
    this.leftValue = leftValue;
    this.rightValue = rightValue;
    this.deivceIcon = deivceIcon;
  }

  /**
   * 主机EXIFTTT对象
   * @param id
   * @param name
   * @param roomId
   * @param type
   * @param notificationEnable
   * @param ruleEnable
   * @param conditionList
   * @param actionList
   * @constructor
   */
  function SHost_EXIFTTT(id, name, roomId, type, notificationEnable, ruleEnable, conditionList, limitConditionList, actionList) {
    this.id = id;
    this.name = name;
    this.roomId = roomId;
    this.type = 'expand_rule';
    this.notificationEnable = notificationEnable;
    this.ruleEnable = ruleEnable;
    this.conditionList = conditionList;
    this.limitConditionList = limitConditionList;
    this.actionList = actionList;
  }

  var SHOST_IFTTT_LIMIT_DEVICE_TYPE = "dev_status";
  var SHOST_IFTTT_LIMIT_TIME_TYPE   = "time_fragments";

  /**
   * 主机IFTTT限制条件对象
   * @param limitType
   * @param limitCondition
   * @constructor
   */
  function SHost_IFTTTLimitCondition(limitType, content) {
    this.limitType = limitType;
    this.content = content;
  }

  /**
   * 主机IFTTT时间限制条件对象
   * @param limitType
   * @param limitCondition
   * @constructor
   */
  function SHost_IFTTTLimitTimeCondition(startTime, endTime, crossDay, repeatDays, inUse) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.crossDay = crossDay;
    this.repeatDays = repeatDays;
    this.inUse = inUse;
  }

  /**
   * #####################################################
   * transform JSON Object to SHost_Object
   * #####################################################
   */
  var SHost_Object_Conversion = {
    toSHostObject : function (tempJson) {},

    toSHostGatewayObject : function (tempJson) {
      var tempObject = new SHost_Gateway;
      tempObject.id = tempJson.gw_nodeid;
      tempObject.ip = tempJson.gw_ip;
      tempObject.name = tempJson.gw_name;
      tempObject.link = tempJson.gw_link;
      return tempObject;
    },

    toSHostHueGatewayObject : function (tempJson) {
      var tempObject = new SHost_HueGateway;
      tempObject.id = tempJson.hue_gw_nodeid;
      tempObject.ip = tempJson.hue_gw_ip;
      tempObject.name = tempJson.hue_gw_name;
      tempObject.link = tempJson.hue_gw_online;
      tempObject.active = tempJson.hue_gw_active;
      return tempObject;
    },

    toSHostFloorObject : function (tempJson) {
      var tempObject = new SHost_Floor;
      tempObject.id  = tempJson.id;
      tempObject.name = tempJson.name;
      return tempObject;
    },

    toSHostRoomObject : function (tempJson) {
      var tempObject = new SHost_Room;
      tempObject.id = tempJson.id;
      tempObject.name = tempJson.name;
      tempObject.floorId = tempJson.floor_id;
      tempObject.icon = tempJson.room_icon;
      return tempObject;
    },

    toSHostDeviceObject : function (tempJson) {
      var tempObject = new SHost_Device;
      if (typeof tempJson.nodeid === "undefined") {
        tempObject.id = tempJson.id;
      }
      else {
        tempObject.id = tempJson.nodeid;
      }
      tempObject.roomId = tempJson.room_id;
      tempObject.name = tempJson.name;
      tempObject.mac = tempJson.mac;
      tempObject.deviceType = SHOST_DEVICES_OPERATE_TYPE.getSHostDeviceNameByOperateType(tempJson.operate_type);
      tempObject.icon = tempJson.device_icon;
      tempObject.status = tempJson.status;
      return tempObject;
    },

    toSHostSceneObject : function (tempJson) {
      var tempObject = new SHost_Scene;
      tempObject.id = tempJson.id;
      tempObject.name = tempJson.name;
      tempObject.roomId = tempJson.room_id;
      tempObject.sceneType = tempJson.scene_type;
      tempObject.timerEnable = (tempJson.timer_enable == '1') ? true : false;
      tempObject.timerTime = tempJson.time;
      tempObject.timerWeeks = tempJson.week.split(",");
      tempObject.pannelId = tempJson.pannel_id.split(",");
      tempObject.actions = tempJson.actions;

      return tempObject;
    },

    toSHostIFTTTObject : function (tempJson) {
      var tempIFTTT = new SHost_IFTTT;
      tempIFTTT.id   = tempJson.rule_id;
      tempIFTTT.name = tempJson.rule_name;
      tempIFTTT.type = "rule";
      tempIFTTT.roomId = tempJson.room_id;
      tempIFTTT.ruleEnable = (tempJson.rule_enable == "1") ? true : false;
      tempIFTTT.notificationEnable = (tempJson.notification_use == "1") ? true : false;
      tempIFTTT.actionList = tempJson.actionList;
      tempIFTTT.conditionList = tempJson.conditionList;

      return tempIFTTT;
    },

    toSHostActionObject : function (tempJson) {
      var tempSceneAction = new SHost_Action;
      tempSceneAction.id     = tempJson.nodeid;
      tempSceneAction.name   = tempJson.name;
      tempSceneAction.area   = tempJson.area;
      tempSceneAction.delay  = tempJson.delay;
      tempSceneAction.roomId = tempJson.room_id;
      tempSceneAction.deviceType = SHOST_DEVICES_OPERATE_TYPE.getSHostDeviceNameByOperateType(tempJson.operate_type);
      tempSceneAction.operation  = SHOST_DEVICES_TYPE.getDeviceObjectByName(tempSceneAction.deviceType).actionConversion(tempJson.operation);

      return tempSceneAction;
    },

    toSHostEXIFTTTObject : function (tempJson) {
      var tempIFTTT = new SHost_EXIFTTT;
      tempIFTTT.id   = tempJson.rule_id;
      tempIFTTT.name = tempJson.rule_name;
      tempIFTTT.type = "expand_rule";
      tempIFTTT.roomId = tempJson.room_id;
      tempIFTTT.ruleEnable = (tempJson.rule_enable == "1") ? true : false;
      tempIFTTT.notificationEnable = (tempJson.notification_use == "1") ? true : false;
      tempIFTTT.conditionList = tempJson.conditionList;
      tempIFTTT.limitConditionList = tempJson.limitConditionList;
      tempIFTTT.actionList = tempJson.actionList;

      return tempIFTTT;
    },

    toSHostIFTTTConditionObject : function (conditionJson) {
      var tempIFTTTCondition = new SHost_IFTTTCondition;
      tempIFTTTCondition.id = conditionJson.nodeid;
      tempIFTTTCondition.name = conditionJson.name;
      tempIFTTTCondition.roomId = conditionJson.room_id;
      tempIFTTTCondition.area = conditionJson.area;
      tempIFTTTCondition.deivceIcon = conditionJson.device_icon;
      tempIFTTTCondition.deviceType = SHOST_DEVICES_OPERATE_TYPE.getSHostDeviceNameByOperateType(conditionJson.operate_type);
      tempIFTTTCondition.leftValue  = SHOST_DEVICES_TYPE.getDeviceObjectByName(tempIFTTTCondition.deviceType).IFTTTConditionConversion(conditionJson.left_base_value);
      tempIFTTTCondition.rightValue = SHOST_DEVICES_TYPE.getDeviceObjectByName(tempIFTTTCondition.deviceType).IFTTTConditionConversion(conditionJson.right_base_value);
      tempIFTTTCondition.compareType = SHOST_IFTTT_COMPARE_TYPE.conversion(conditionJson.compare_type);

      return tempIFTTTCondition;
    },

    toSHostIFTTTLimitConditionObject : function (tempJson) {
      var tempLimitCondition = new SHost_IFTTTLimitCondition;
      tempLimitCondition.limitType = tempJson.limit_type;
      tempLimitCondition.content = tempJson.limit_cond;
      return tempLimitCondition;
    },

    toSHostIFTTTLimitTimeConditionObject : function (tempJson) {
      var tempLimitTimeCondition = new SHost_IFTTTLimitTimeCondition;
      tempLimitTimeCondition.crossDay = tempJson.cross_day == "1" ? true : false;
      tempLimitTimeCondition.endTime = tempJson.end_time;
      tempLimitTimeCondition.inUse = tempJson.in_use == "1" ? true : false;
      tempLimitTimeCondition.repeatDays = tempJson.repeat_days;
      tempLimitTimeCondition.startTime = tempJson.start_time;
      return tempLimitTimeCondition;
    },

    toSHostKonkeSocketObject : function(tempJson) {
      var tempObject = new SHost_Device;
      tempObject.id = tempJson.id;
      tempObject.mac = tempJson.socket_mac;
      tempObject.name = tempJson.socket_name;
      tempObject.roomId = tempJson.room_id;
      tempObject.deviceType = SHOST_DEVICES_OPERATE_TYPE.getSHostDeviceNameByOperateType(tempJson.socket_type);
      tempObject.status = SHOST_DEVICES_TYPE.getDeviceObjectByName(tempObject.deviceType).status(SHOST_DEVICE_DEFAULT_STATUS);
      tempObject.status.online = (tempJson.socket_online == "1") ? "ON" : "OFF";
      tempObject.status.switch = tempJson.socket_state.socket_switch_on ? "ON" : "OFF";
      tempObject.status.USBSwitch = tempJson.socket_state.usb_switch_on ? "ON" : "OFF";
      tempObject.status.lightSwitch = tempJson.socket_state.light_switch_on ? "ON" : "OFF";
      return tempObject;
    },

    toSHostKonkeLightObject : function(tempJson) {
      var tempObject = new SHost_Device;
      tempObject.id = tempJson.id;
      tempObject.mac = tempJson.light_mac;
      tempObject.name = tempJson.light_name;
      tempObject.roomId = tempJson.room_id;
      tempObject.deviceType = SHOST_DEVICES_OPERATE_TYPE.getSHostDeviceNameByOperateType(tempJson.light_type);
      tempObject.status = SHOST_DEVICES_TYPE.getDeviceObjectByName(tempObject.deviceType).status(SHOST_DEVICE_DEFAULT_STATUS);
      tempObject.status.online = (tempJson.light_online == "1") ? "ON" : "OFF";
      tempObject.status.switch = tempJson.light_state.on ? "ON" : "OFF";
      tempObject.status.rgb = tempJson.light_state.rgb;
      tempObject.status.brightness = tempJson.light_state.bri;
      tempObject.status.model = tempJson.light_state.model;
      tempObject.status.speed = tempJson.light_state.speed;
      return tempObject;
    },

    toSHostKonkeHumidifierObject : function (tempJson) {
      var tempObject = new SHost_Device;
      tempObject.id = tempJson.id;
      tempObject.mac = tempJson.humidifier_mac;
      tempObject.name = tempJson.humidifier_name;
      tempObject.roomId = tempJson.room_id;
      tempObject.deviceType = SHOST_DEVICES_OPERATE_TYPE.getSHostDeviceNameByOperateType(tempJson.humidifier_type);
      tempObject.status = SHOST_DEVICES_TYPE.getDeviceObjectByName(tempObject.deviceType).status(SHOST_DEVICE_DEFAULT_STATUS);
      tempObject.status.online = (tempJson.humidifier_online == "1") ? "ON" : "OFF";
      tempObject.status.status = tempJson.humidifier_state.status;
      tempObject.status.quantity = tempJson.humidifier_state.fog_vol;
      tempObject.status.moisturize.on = tempJson.humidifier_state.constand_wet.on ? "ON" : "OFF";
      tempObject.status.moisturize.quantity = tempJson.humidifier_state.constand_wet.vol;
      return tempObject;
    },

    toSHostKonkeAircleanerObject : function (tempJson) {
      var tempObject = new SHost_Device;
      tempObject.id = tempJson.id;
      tempObject.mac = tempJson.aircleaner_mac;
      tempObject.name = tempJson.aircleaner_name;
      tempObject.roomId = tempJson.room_id;
      tempObject.deviceType = SHOST_DEVICES_OPERATE_TYPE.getSHostDeviceNameByOperateType(tempJson.aircleaner_type);
      tempObject.status = SHOST_DEVICES_TYPE.getDeviceObjectByName(tempObject.deviceType).status(SHOST_DEVICE_DEFAULT_STATUS);
      tempObject.status.online = (tempJson.aircleaner_online == "1") ? "ON" : "OFF";
      tempObject.status.switch = tempJson.aircleaner_state.on ? "ON" : "OFF";
      tempObject.status.anion = tempJson.aircleaner_state.anion_on ? "ON" : "OFF";
      tempObject.status.wind = tempJson.aircleaner_state.wind;
      tempObject.status.amount = tempJson.aircleaner_state.air_vol;
      tempObject.status.quality = tempJson.aircleaner_state.air_quality;
      tempObject.status.AQI = tempJson.aircleaner_state.air_index;
      if (tempJson.aircleaner_state.auto_mode_on) {
        tempObject.status.autoMode = "ON";
        tempObject.status.sleepMode = "OFF";
      }
      else {
        tempObject.status.autoMode = "OFF";
        if (tempJson.aircleaner_state.sleep_mode_on) {
          tempObject.status.sleepMode = "ON";
        }
        else {
          tempObject.status.sleepMode = "OFF";
        }
      }
      return tempObject;
    },

    toSHostHueLightObject : function(tempJson) {
      var tempObject = new SHost_Device;
      tempObject.id = tempJson.id;
      tempObject.mac = "";
      tempObject.name = tempJson.light_name;
      tempObject.roomId = tempJson.room_id;
      tempObject.deviceType = "NET_HueLight";
      tempObject.status = SHOST_DEVICES_TYPE.getDeviceObjectByName(tempObject.deviceType).status(SHOST_DEVICE_DEFAULT_STATUS);
      tempObject.status.switch = tempJson.light_state.on ? "ON" : "OFF";
      tempObject.status.xy = tempJson.light_state.xy;
      tempObject.status.brightness = tempJson.light_state.bri;
      return tempObject;
    },

    toSHostActionJson : function (actionObject) {
      var tempJson = new Object();
      tempJson.nodeid = actionObject.id;
      tempJson.name = actionObject.name;
      tempJson.area = actionObject.area;
      tempJson.delay = actionObject.delay;
      tempJson.room_id = actionObject.roomId;
      tempJson.operate_type = SHOST_DEVICES_TYPE.getDeviceObjectByName(actionObject.deviceType).operateType;
      tempJson.operation = SHOST_DEVICES_TYPE.getDeviceObjectByName(actionObject.deviceType).actionConversion(actionObject.operation);

      return tempJson;
    },

    toSHostIFTTTConditionJson : function (conditionObject) {
      var tempJson = new Object();
      tempJson.area = conditionObject.area;
      tempJson.name = conditionObject.name;
      tempJson.nodeid = conditionObject.id;
      tempJson.room_id = conditionObject.roomId;
      tempJson.device_icon = conditionObject.deivceIcon;
      tempJson.operate_type = SHOST_DEVICES_TYPE.getDeviceObjectByName(conditionObject.deviceType).operateType;
      tempJson.left_base_value  = SHOST_DEVICES_TYPE.getDeviceObjectByName(conditionObject.deviceType).IFTTTConditionConversion(conditionObject.leftValue);
      tempJson.right_base_value = SHOST_DEVICES_TYPE.getDeviceObjectByName(conditionObject.deviceType).IFTTTConditionConversion(conditionObject.rightValue);
      tempJson.compare_type = SHOST_IFTTT_COMPARE_TYPE.conversion(conditionObject.compareType);

      return tempJson;
    },

    toSHostIFTTTLimitConditionJson : function (limitConditionObject) {
      var tempJson = new Object();
      tempJson.limit_type = limitConditionObject.limitType;
      tempJson.limit_cond = limitConditionObject.content;
      return tempJson;
    },

    toSHostIFTTTLimitTimeConditionJson : function (limitTimeConditionObject) {
      var tempJson = new Object();
      tempJson.cross_day = limitTimeConditionObject.crossDay ? "1" : "0";
      tempJson.end_time = limitTimeConditionObject.endTime;
      tempJson.in_use = limitTimeConditionObject.inUse ? "1" : "0";
      tempJson.repeat_days = limitTimeConditionObject.repeatDays;
      tempJson.start_time = limitTimeConditionObject.startTime;
      return tempJson;
    },

    func : function (tempJson) {}
  };

  /**
   * #####################################################
   * host current status
   * {"init": null, "link": null, "login": null, "synch": null};
   * @type {number}
   * #####################################################
   */
  var SHOST_STATUS_STEP_INIT  = 'init';
  var SHOST_STATUS_STEP_LINK  = 'link';
  var SHOST_STATUS_STEP_LOGIN = 'login';
  var SHOST_STATUS_STEP_SYNCH = 'synch';

  var SHOST_STATUS_INIT    =  null;
  var SHOST_STATUS_ONGOING =  0;
  var SHOST_STATUS_FAILED  = -1;
  var SHOST_STATUS_SUCCESS =  1;

  var DEVICE_ID  = DEVICEID;
  var ACCESS_KEY = ACCESSKEY;

  var HOST_DEBUG_PROMPT = "host [" + DEVICE_ID + "]\n";

  /**
   * #####################################################
   * 失败   -1
   * 进行中  0
   * 成功    1
   * 初始化  null
   * #####################################################
   */
  var hostCurrentStatus = {"init": null, "link": null, "login": null, "synch": null};

  // host socket
  var hostSocket = null;

  // data repository
  this.hostDataRepository = null;

  //  call back function
  var hostCurrentStatusCallback = null;
  var hostDevicesStatusCallback = null;

  // host synch logic steps
  var TAG_STEPS_LOGIN       = false;
  var TAG_STEPS_SYNCH       = false;
  var TAG_STEPS_NEWDEVICES  = false;
  var TAG_STEPS_CCUINFO     = false;

  // 检测登录报文是否已经发送
  var TAG_LOGIN_SENT        = false;

  this.configSHostLog = function (bool) {
    SHostLog.setEnable(bool);
  };

  /**
   * 对外接口(UI) 初始化主机
   * 设置主机状态 创建数据仓库  创建链路连接
   */
  this.initHost = function () {
    SHostLog.info(HOST_DEBUG_PROMPT + 'host start init.');
    setHostCurrentStatus(SHOST_STATUS_STEP_INIT, SHOST_STATUS_ONGOING);
    this.hostDataRepository = new HostDataRepository(this);
    hostSocket = new HostSocket(this);
  };

  /**
   * 对外接口（UI），设置【主机】当前状态信息推送
   * @param callback
   */
  this.setHostCurrentStatusCallback = function (callback) {
    hostCurrentStatusCallback = callback;
  };

  /**
   * 对外接口（UI），设置【主机设备】状态信息推送
   * @param callback
   */
  this.setHostDevicesStatusCallback = function (callback) {
    hostDevicesStatusCallback = callback;
  };

  /**
   * 获取设备配置的名称
   * @returns {string}
   */
  this.getHostDeviceConfigAction = function () {
    return SHOST_DEVICE_CONFIG_ACTION;
  };

  /**
   * 获取设备操作的名称
   * @returns {string}
   */
  this.getHostDeviceOperateAction = function () {
    return SHOST_DEVICE_OPERATE_ACTION;
  };

  /**
   * 根据设备的名称，操作类型，操作动作，得到设备的操作协议
   * @param deviceName
   * @param operationType
   * @param operationAction
   * @returns {*}
   */
  this.getHostDeviceRequestOperation = function (deviceName, operationType, operationAction) {
    var action = SHOST_DEVICES_TYPE.getDeviceObjectByName(deviceName)[operationType];
    if (action != null) {
      if (typeof action[operationAction] === "undefined") {
        return null;
      }
      else {
        return action[operationAction];
      }
    }
    else {
      return null;
    }
  };

  /**
   * SHost 对外接口日志
   * @param message
   */
  this.hostErrorLog = function (message) {
    SHostLog.error(HOST_DEBUG_PROMPT + message);
  };

  /**
   * 判断是否是数组
   * @param Obj
   * @returns {*}
   */
  this.isArray = function (Obj) {
    return MethodServices.isArray(Obj);
  };

  /**
   * 判断是否是数组
   * @param Obj
   * @returns {*}
   */
  this.cloneArray = function (originArray, targetArray) {
    return MethodServices.cloneArray(originArray, targetArray);
  };

  /**
   * 对外接口（UI）， 发送信息至主机
   */
  this.sendSHostRequest = function (data) {
    if (hostSocket) {
      hostSocket.sendData(data);
    }
  };

  /**
   * SHost 动作对象转换成JSON动作
   * @param SHostSceneActionObject SHostIFTTTActionObject
   */
  this.actionConversion = function (SHostActionObject) {
    return SHost_Object_Conversion.toSHostActionJson(SHostActionObject);
  };

  /**
   * SHost IFTTT条件对象转换成JSON动作
   * @param SHostIFTTTConditionObject
   */
  this.conditionConversion = function (SHostIFTTTConditionObject) {
    return SHost_Object_Conversion.toSHostIFTTTConditionJson(SHostIFTTTConditionObject);
  };

  /**
   * 快捷面板设置按键动作的对象装换
   * @param tempAction
   * @returns {Object}
   */
  this.shortcutPanelActionConversion = function(tempAction) {
    var tempObject = new Object();
    tempObject.nodeid = tempAction.id;
    tempObject.operate_type = SHOST_DEVICES_TYPE.getDeviceObjectByName(tempAction.deviceType).operateType;
    tempObject.operation = SHOST_DEVICES_TYPE.getDeviceObjectByName(tempAction.deviceType).actionConversion(tempAction.operation);
    tempObject.room_id = tempAction.roomId;
    return tempObject;
  };

  /**
   * SHost IFTTT限制条件对象转换成JSON动作
   * @param SHostIFTTTLimitConditionObject
   */
  this.limitConditionConversion = function (SHostIFTTTLimitConditionObject) {
    return SHost_Object_Conversion.toSHostIFTTTLimitConditionJson(SHostIFTTTLimitConditionObject);
  };

  /**
   * SHost IFTTT时间限制条件对象转换成JSON动作
   * @param SHostIFTTTLimitTimeConditionObject
   */
  this.limitTimeConditionConversion = function (SHostIFTTTLimitConditionObject) {
    return SHost_Object_Conversion.toSHostIFTTTLimitTimeConditionJson(SHostIFTTTLimitConditionObject);
  };

  /**
   * 获取空调的数值按键ID
   * @param power
   * @param temp
   * @param model
   * @param wind
   * @returns {*}
   */
  this.getAirConditionButtonId = function (power, temp, model, wind) {
    var tempId = null;
    for (var attr in AIR_CONDITION_OPCODE_ANNOTATION) {
      if (power == "ON") {
        if (model == AIR_CONDITION_OPCODE_ANNOTATION[attr]["model"]) {
          if (wind == AIR_CONDITION_OPCODE_ANNOTATION[attr]["wind"]) {
            if (temp == AIR_CONDITION_OPCODE_ANNOTATION[attr]["temp"]) {
              tempId = AIR_CONDITION_OPCODE_ANNOTATION[attr]["id"];
              break;
            }
          }
        }
      }
      else {
        tempId = AIR_CONDITION_OPCODE_ANNOTATION["0"]["id"];
      }
    }

    return tempId;
  };

  /**
   * 对内接口，设置当前主机的状态
   * @param "statusStep": "init/link/login/synch"
   * @param "statusValue": null/-1/0/1
   * @returns {boolean}
   */
  function setHostCurrentStatus(statusStep, statusValue) {
    if (typeof hostCurrentStatus[statusStep] === 'undefined') {
      SHostLog.error(HOST_DEBUG_PROMPT + 'host use function [SH] [setHostCurrentStatus] failed.');
      return false;
    }
    else {
      // 备份主机状态信息 为后面状态改变提供逻辑处理
      var tempStatus = JSON.stringify(hostCurrentStatus);

      /*      var tempStatus = JSON.parse(tempStr);
       var tempFind = false;
       for (var attr in hostCurrentStatus) {
       if (attr == statusStep) {
       tempFind = true;
       if (tempStatus[attr] == statusValue) {
       // 设置状态时，设置的数值与原来的状态相同，不做任何事。
       }
       else{
       // 设置状态时，设置的数值与原来的状态不同，赋值，状态改变通知、逻辑。
       hostCurrentStatus[attr] = statusValue;
       SHostLog.info(HOST_DEBUG_PROMPT + "[setHostCurrentStatus][step:" + statusStep + "] change [value:" + statusValue + "]");
       hostCurrentStatusChange(tempStr, JSON.stringify(hostCurrentStatus));
       }
       }
       else {
       if (!tempFind) {
       if (hostCurrentStatus[attr] == SHOST_STATUS_SUCCESS) {
       // 设置状态时，之前的逻辑状态是成功的，不做任何事。
       }
       else {
       hostCurrentStatus[attr] = SHOST_STATUS_SUCCESS;
       SHostLog.info(HOST_DEBUG_PROMPT + "[setHostCurrentStatus][step:" + attr + "] change [value:" + SHOST_STATUS_SUCCESS + "]");
       hostCurrentStatusChange(tempStr, JSON.stringify(hostCurrentStatus));
       }
       }
       else {
       if (hostCurrentStatus[attr] == SHOST_STATUS_INIT) {
       // 设置状态时，之后的逻辑状态是初始化的，不做任何事。
       }
       else {
       hostCurrentStatus[attr] = SHOST_STATUS_INIT;
       SHostLog.info(HOST_DEBUG_PROMPT + "[setHostCurrentStatus][step:" + attr + "] change [value:" + SHOST_STATUS_INIT + "]");
       hostCurrentStatusChange(tempStr, JSON.stringify(hostCurrentStatus));
       }
       }
       }
       }
       */

      // 设置主机状态：1、先赋值
      var tempFind = false;
      for (var attr in hostCurrentStatus) {
        //查找发生变化的步骤，前面的步骤设置成功，当前的步骤重新赋值，后面的初始化。
        if (attr == statusStep) {
          tempFind = true;
          hostCurrentStatus[attr] = statusValue;
          SHostLog.info(HOST_DEBUG_PROMPT + "[setHostCurrentStatus][step:" + statusStep + "][value:" + statusValue + "]");
        }
        else {
          if (!tempFind) {
            hostCurrentStatus[attr] = SHOST_STATUS_SUCCESS;
          }
          else {
            hostCurrentStatus[attr] = SHOST_STATUS_INIT;
          }
        }
      }

      // 设置主机状态：2、比较前后主机状态，做出相应的逻辑处理
      hostCurrentStatusChange(tempStatus);
      return true;
    }
  }

  /**
   * 对内接口，当设置主机状态时，检测状态是否发生变化，如果发生了变化：1、上传状态变更至UI；2、......
   * @param tempStr jsonStr
   */
  function hostCurrentStatusChange(tempStr) {
    var tempStatus = JSON.parse(tempStr);
    for (var attr in hostCurrentStatus) {
      if (hostCurrentStatus[attr] != tempStatus[attr]) {
        SHostLog.info(HOST_DEBUG_PROMPT + "host status change, [step:" + attr + "][value:" + tempStatus[attr] + "=>" + hostCurrentStatus[attr] + "]");
        //如果主机的状态发生了变化，第一步，一定要上传通知UI，所以UI要设置一个回调函数要提供给SDK 主机的状态
        if (hostCurrentStatusCallback) {
          var jsonObj = {"deviceId": DEVICEID, "status": {"statusStep": attr, "statusValue": hostCurrentStatus[attr]}};
          hostCurrentStatusCallback(JSON.stringify(jsonObj));
        }

        //主机状态发生变化，根据不同的状态，不同的值...... to do something
        if (attr == SHOST_STATUS_STEP_INIT) {
        }
        else if (attr == SHOST_STATUS_STEP_LINK) {
          if (hostCurrentStatus[attr] == SHOST_STATUS_SUCCESS) {
            if (tempStatus[attr] != SHOST_STATUS_SUCCESS) {
              if (!TAG_LOGIN_SENT) {
                sendLoginRequest();
              }
            }
          }
          else if (hostCurrentStatus[attr] == SHOST_STATUS_FAILED) {
            hostSocket = null;
          }
        }
        else if (attr == SHOST_STATUS_STEP_LOGIN) {
        }
        else if (attr == SHOST_STATUS_STEP_SYNCH) {
        }
        else {
          SHostLog.error(HOST_DEBUG_PROMPT + "attr in hostCurrentStatus, attr error " + attr);
        }
      }
    }
  }

  /*
   function hostCurrentStatusChange(tempStr, newStatusStr) {
   var tempStatus = JSON.parse(tempStr);
   var newStatus = JSON.parse(newStatusStr);
   for (var attr in newStatus) {
   if (newStatus[attr] != tempStatus[attr]) {
   SHostLog.info(HOST_DEBUG_PROMPT + "host status change, [step:" + attr + "][value:" + tempStatus[attr] + "=>" + newStatus[attr] + "]");
   //如果主机的状态发生了变化，第一步，一定要上传通知UI，所以UI要设置一个回调函数要提供给SDK 主机的状态
   if (hostCurrentStatusCallback) {
   var jsonObj = {"deviceId": DEVICEID, "status": {"statusStep": attr, "statusValue": newStatus[attr]}};
   hostCurrentStatusCallback(JSON.stringify(jsonObj));
   }

   //主机状态发生变化，根据不同的状态，不同的值...... to do something
   if (attr == SHOST_STATUS_STEP_INIT) {
   }
   else if (attr == SHOST_STATUS_STEP_LINK) {
   if (newStatus[attr] == SHOST_STATUS_SUCCESS) {
   if (tempStatus[attr] != SHOST_STATUS_SUCCESS) {
   if (!TAG_LOGIN_SENT) {
   sendLoginRequest();
   }
   }
   }
   else if (newStatus[attr] == SHOST_STATUS_FAILED) {
   hostSocket = null;
   }
   }
   else if (attr == SHOST_STATUS_STEP_LOGIN) {
   }
   else if (attr == SHOST_STATUS_STEP_SYNCH) {
   }
   else {
   SHostLog.error(HOST_DEBUG_PROMPT + "attr in hostCurrentStatus, attr error " + attr);
   }
   }
   }
   }
   */

  /**
   * 对内接口， 查询当前【主机】某一状态的状态值，
   * @param step
   * @returns {*}
   */
  function getHostCurrentStatusByStep(step) {
    if (typeof hostCurrentStatus[step] === 'undefined') {
      SHostLog.error(HOST_DEBUG_PROMPT + 'hostCurrentStatus[step]:' + step + " undefined");
      return ;
    }

    return hostCurrentStatus[step];
  }

  /**
   * 对内接口，在链接成功时，发送登录报文；
   */
  function sendLoginRequest() {
    if (hostSocket) {
      // 登入信息
      var loginData = {"arg": {"username":"18651049998","device"     : "PC", "seq"        : "1", "device_id"  : DEVICE_ID, "access_key" : ACCESS_KEY, "version"    : WEB_VERSION}, "nodeid"     : "*", "opcode"     : "LOGIN_ACCESSKEY", "requester"  : "HJ_Server"};
      SHostLog.info(HOST_DEBUG_PROMPT + "send login request.");
      hostSocket.sendData(loginData);
      TAG_LOGIN_SENT = true;
      setHostCurrentStatus(SHOST_STATUS_STEP_LOGIN, SHOST_STATUS_ONGOING);
    }
  }

  /**
   * 对内接口，发送同步信息；
   */
  function sendSynchRequest() {
    if (hostSocket) {
      // 同步信息
      var synchData = {"arg": "*", "nodeid": "*", "opcode": "SYNC_INFO", "requester": "HJ_Config"};
      SHostLog.info(HOST_DEBUG_PROMPT + "send synch request.");
      hostSocket.sendData(synchData);
    }
  }

  /**
   * 对内接口，发送获取主机信息信息；
   */
  function sendGetHostInfoRequest() {
    if (hostSocket) {
      // 同步信息
      var Data = {"arg": "*", "nodeid": "*", "opcode": "GET_CCU_INFO", "requester": "HJ_Server"};
      SHostLog.info(HOST_DEBUG_PROMPT + "send get host info request.");
      hostSocket.sendData(Data);
    }
  }

  /**
   * 对内接口（socket），用于分析接受从socket处理后的信息
   * @param tempStr
   */
  function parseSocketReceiveMessages(host, tempStr) {
    SHostLog.log(HOST_DEBUG_PROMPT + "host parse Socket Receive Messages.");
    host.hostDataRepository.parseReceiveMessages(tempStr);
    var tempJson = JSON.parse(tempStr);
    if (tempJson.dataType == OPCODE_TYPE_LOGIN) {
      synchHostConfigInformationLogic(tempStr);
    }
    else if (tempJson.dataType == OPCODE_TYPE_SYNCH) {
      synchHostConfigInformationLogic(tempStr);
    }
    else if (tempJson.dataType == OPCODE_TYPE_STATUS ||
        tempJson.dataType == OPCODE_TYPE_OPERATE) {
      // to do something
      if (tempJson.data.status == SHOST_FEEDBACK_SUCCESS_STATUS) {
        var tempObject = host.hostDataRepository.getDeviceInfoByNodeId(tempJson.data.nodeid);
        if (tempObject != null && hostDevicesStatusCallback != null) {
          hostDevicesStatusCallback(JSON.stringify(tempObject));
        }
      }
      else {
        // operate device failed
      }
    }
    else if (tempJson.dataType == OPCODE_TYPE_CONFIG) {
      if (tempJson.data.status == SHOST_FEEDBACK_SUCCESS_STATUS) {
        SHostLog.info(HOST_DEBUG_PROMPT + "get a config message.");
        sendSynchRequest();
      }
      else {
        // config failed
      }
    }
    else {
      SHostLog.log(HOST_DEBUG_PROMPT + "get a [" + tempJson.dataType + "] message.");
    }
  }

  /**
   * 对内接口，实现登录后，同步主机信息机制
   * @param tempStr
   */
  function synchHostConfigInformationLogic(tempStr) {
    var tempJson = JSON.parse(tempStr);
    if (tempJson.data.opcode == SHOST_FEEDBACK_OPCODE_LOGIN) {
      if (!TAG_STEPS_LOGIN) {
        if (tempJson.data.status == SHOST_FEEDBACK_SUCCESS_STATUS) {
          TAG_STEPS_LOGIN = true;
          SHostLog.info(HOST_DEBUG_PROMPT + 'host login success.');
          setHostCurrentStatus(SHOST_STATUS_STEP_LOGIN, SHOST_STATUS_SUCCESS);
          SHostLog.info(HOST_DEBUG_PROMPT + 'host synch going.');
          setHostCurrentStatus(SHOST_STATUS_STEP_SYNCH, SHOST_STATUS_ONGOING);
          sendSynchRequest();
        }
        else {
          SHostLog.error(HOST_DEBUG_PROMPT + 'host login failed.');
          setHostCurrentStatus(SHOST_STATUS_STEP_LOGIN, SHOST_STATUS_FAILED);
          alert('主机连接失败')
          sessionStorage.removeItem('host_code')
          location.reload();
        }
      }
    }
    else if (tempJson.data.opcode == SHOST_FEEDBACK_OPCODE_SYNCH) {
      if (!TAG_STEPS_SYNCH) {
        if (tempJson.data.status == SHOST_FEEDBACK_SUCCESS_STATUS) {
          TAG_STEPS_SYNCH = true;
          SHostLog.info(HOST_DEBUG_PROMPT + "get synch message success.");
          sendGetHostInfoRequest();
        }
        else {
          SHostLog.error(HOST_DEBUG_PROMPT + 'host get synch data failed.');
          setHostCurrentStatus(SHOST_STATUS_STEP_SYNCH, SHOST_STATUS_FAILED);
        }
      }
    }
    else if (tempJson.data.opcode == SHOST_FEEDBACK_OPCODE_NEWDEVICES) {
      if (!TAG_STEPS_NEWDEVICES) {
        if (tempJson.data.status == SHOST_FEEDBACK_SUCCESS_STATUS) {
          TAG_STEPS_NEWDEVICES = true;
          SHostLog.info(HOST_DEBUG_PROMPT + "get new devices message success.");
          if (TAG_STEPS_CCUINFO) {
            setHostCurrentStatus(SHOST_STATUS_STEP_SYNCH, SHOST_STATUS_SUCCESS);
            SHostLog.info(HOST_DEBUG_PROMPT + 'host synch success .');
          }
        }
        else {
          SHostLog.error(HOST_DEBUG_PROMPT + "host get synch info failed.");
          setHostCurrentStatus(SHOST_STATUS_STEP_SYNCH, SHOST_STATUS_FAILED);
        }
      }
    }
    else if (tempJson.data.opcode == SHOST_FEEDBACK_OPCODE_CCUINFO) {
      if (!TAG_STEPS_CCUINFO) {
        if (tempJson.data.status == SHOST_FEEDBACK_SUCCESS_STATUS) {
          TAG_STEPS_CCUINFO = true;
          SHostLog.info(HOST_DEBUG_PROMPT + "get ccu info message success.");
          if (TAG_STEPS_NEWDEVICES) {
            setHostCurrentStatus(SHOST_STATUS_STEP_SYNCH, SHOST_STATUS_SUCCESS);
            SHostLog.info(HOST_DEBUG_PROMPT + 'host synch success .');
          }
        }
        else {
          SHostLog.error(HOST_DEBUG_PROMPT + "host get ccu info failed.");
          setHostCurrentStatus(SHOST_STATUS_STEP_SYNCH, SHOST_STATUS_FAILED);
        }
      }
    }
    else {
      SHostLog.error(HOST_DEBUG_PROMPT + "unknow message\n" + tempStr);
    }
  }

  /**
   * 对内接口 推送当前【主机设备】发生变化时，推送信息至UI
   * @param jsonStr
   */
  function pushHostDevicesStatus(jsonStr) {
    if (hostDevicesStatusCallback) {
      if (typeof jsonStr === 'object') {
        jsonStr = JSON.stringify(jsonStr);
      }
      else if (typeof jsonStr === 'string') {
      }
      else {
        SHostLog.warn(HOST_DEBUG_PROMPT + 'unknown temp string:' + typeof jsonStr);
      }

      SHostLog.warn(HOST_DEBUG_PROMPT + jsonStr);
      hostDevicesStatusCallback(jsonStr);
    }
    else {
      SHostLog.error(HOST_DEBUG_PROMPT + 'do not set device status call back.');
    }
  }

  /**
   * #####################################################
   * HostSocket
   * #####################################################
   */
  function HostSocket(host) {

    function Http(j) {
      this.cID = Math.random().toString(36).substr(2);
      this.webtcp = j;
      this.webtcp.httpClients[this.cID] = this;
      this.createPacket = function () {
        return {cID: this.cID, type: "http", host: this.remoteAddress, port: this.remotePort, method: null, data: null}
      };
      this.ondata = function () {
      };
      this.get = function (g, c) {
        this.on("data", c);
        this.rpc("httpGet", [g])
      };
      this.post = function (g, c, j) {
        this.on("data", j);
        this.rpc("httpPost", [g, c])
      }
    }
    Http.prototype = new WebTCPIO;
    function Socket(j, g, c, p, mySocket) {
      this.mySocket = mySocket;
      this.sID = Math.random().toString(36).substr(2);
      this.webtcp = j;
      this.closed = this.ready = !1;
      this.options = p;
      this.sockOpts = {_updating: !1};
      this.remoteAddress = g;
      this.remotePort = c;
      //WebTCP de sockets 对象在这里赋值
      this.webtcp.sockets[this.sID] = this;
      this.createPacket = function () {
        return {
          id: Math.random().toString(36).substr(2),
          sID: this.sID,
          type: "tcp",
          options: this.options,
          host: this.remoteAddress,
          port: this.remotePort,
          data: null
        }
      };
      this.onconnect = function () {
        this.webtcp.sockets[sID].ready = !0;
        this.webtcp.sockets[sID].closed = !1;
      };
      this.ondata = function () {
      };
      this.onend = function () {
      };
      this.ontimeout = function () {
      };
      this.ondrain = function () {
      };
      this.onclose = function () {
        this.webtcp.sockets[sID].ready = !1;
        this.webtcp.sockets[sID].closed = !0;
      };
      this.getSockOpts = function () {
        this.sockOpts._updating = !0;
        this.rpc("getSockOpts")
      };
      this.onSockOptsRcv = function (c) {
        this.sockOpts = c;
        this.sockOpts._updating = !1
      }
    }
    Socket.prototype = new WebTCPIO;
    var JSON;
    JSON || (JSON = {});
    (function () {
      function j(c, p) {
        var q, t, n, x, i = k, e, l = p[c];
        l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(c));
        "function" == typeof r && (l = r.call(p, c, l));
        switch (typeof l) {
          case "string":
            return g(l);
          case "number":
            return isFinite(l) ? String(l) : "null";
          case "boolean":
          case "null":
            return String(l);
          case "object":
            if (!l)return "null";
            k += v;
            e = [];
            if ("[object Array]" === Object.prototype.toString.apply(l)) {
              x = l.length;
              for (q = 0; q < x; q += 1)e[q] = j(q, l) || "null";
              n = 0 === e.length ? "[]" : k ? "[\n" + k + e.join(",\n" + k) + "\n" + i + "]" :
              "[" + e.join(",") + "]";
              k = i;
              return n
            }
            if (r && "object" == typeof r) {
              x = r.length;
              for (q = 0; q < x; q += 1)"string" == typeof r[q] && (t = r[q], n = j(t, l), n && e.push(g(t) + (k ? ": " : ":") + n))
            } else for (t in l)Object.prototype.hasOwnProperty.call(l, t) && (n = j(t, l), n && e.push(g(t) + (k ? ": " : ":") + n));
            n = 0 === e.length ? "{}" : k ? "{\n" + k + e.join(",\n" + k) + "\n" + i + "}" : "{" + e.join(",") + "}";
            k = i;
            return n
        }
      }

      function g(c) {
        n.lastIndex = 0;
        return n.test(c) ? '"' + c.replace(n, function (c) {
          var g = D[c];
          return "string" == typeof g ? g : "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4)
        }) +
        '"' : '"' + c + '"'
      }

      function c(c) {
        return 10 > c ? "0" + c : c
      }

      "use strict";
      "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + c(this.getUTCMonth() + 1) + "-" + c(this.getUTCDate()) + "T" + c(this.getUTCHours()) + ":" + c(this.getUTCMinutes()) + ":" + c(this.getUTCSeconds()) + "Z" : null
      }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf()
      });
      var p = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          n = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, k, v, D = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
          }, r;
      "function" != typeof JSON.stringify && (JSON.stringify = function (c, g, p) {
        var n;
        v = k = "";
        if ("number" == typeof p)for (n = 0; n < p; n += 1)v += " "; else"string" == typeof p && (v = p);
        r = g;
        if (!g || "function" == typeof g || "object" == typeof g && "number" == typeof g.length)return j("", {"": c});
        throw Error("JSON.stringify");
      });
      "function" != typeof JSON.parse && (JSON.parse = function (c, g) {
        function j(c, k) {
          var i, e, l = c[k];
          if (l && "object" == typeof l)for (i in l)Object.prototype.hasOwnProperty.call(l, i) && (e = j(l, i), void 0 !== e ? l[i] = e : delete l[i]);
          return g.call(c, k, l)
        }

        var k, c = String(c);
        p.lastIndex = 0;
        p.test(c) && (c = c.replace(p, function (c) {
          return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(c.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return k = eval("(" + c + ")"), "function" == typeof g ? j({"": k}, "") : k;
        throw new SyntaxError("JSON.parse");
      })
    })();
    SockJS = function () {
      var j = document, g = window, c = {}, p = function () {
      };
      p.prototype.addEventListener = function (a, b) {
        this._listeners || (this._listeners = {});
        a in this._listeners || (this._listeners[a] = []);
        var f = this._listeners[a];
        -1 === c.arrIndexOf(f, b) && f.push(b)
      };
      p.prototype.removeEventListener = function (a, b) {
        if (this._listeners && a in this._listeners) {
          var f = this._listeners[a], d = c.arrIndexOf(f, b);
          -1 !== d && (1 < f.length ? this._listeners[a] = f.slice(0, d).concat(f.slice(d + 1)) : delete this._listeners[a])
        }
      };
      p.prototype.dispatchEvent =
          function (a) {
            var b = a.type, c = Array.prototype.slice.call(arguments, 0);
            this["on" + b] && this["on" + b].apply(this, c);
            if (this._listeners && b in this._listeners)for (var d = 0; d < this._listeners[b].length; d++)this._listeners[b][d].apply(this, c)
          };
      var n = function (a, b) {
        this.type = a;
        if ("undefined" != typeof b)for (var c in b)b.hasOwnProperty(c) && (this[c] = b[c])
      };
      n.prototype.toString = function () {
        var a = [], b;
        for (b in this)if (this.hasOwnProperty(b)) {
          var c = this[b];
          "function" == typeof c && (c = "[function]");
          a.push(b + "=" + c)
        }
        return "SimpleEvent(" +
            a.join(", ") + ")"
      };
      var k = function (a) {
        this.events = a || []
      };
      k.prototype.emit = function (a) {
        var b = Array.prototype.slice.call(arguments, 1);
        !this.nuked && this["on" + a] && this["on" + a].apply(this, b);
        -1 === c.arrIndexOf(this.events, a) && c.log("Event " + JSON.stringify(a) + " not listed " + JSON.stringify(this.events) + " in " + this)
      };
      k.prototype.nuke = function () {
        this.nuked = !0;
        for (var a = 0; a < this.events.length; a++)delete this[this.events[a]]
      };
      c.random_string = function (a, b) {
        var b = b || 37, c, d = [];
        for (c = 0; c < a; c++)d.push("abcdefghijklmnopqrstuvwxyz0123456789_".substr(Math.floor(Math.random() *
            b), 1));
        return d.join("")
      };
      c.random_number = function (a) {
        return Math.floor(Math.random() * a)
      };
      c.random_number_string = function (a) {
        var b = ("" + (a - 1)).length;
        return (Array(b + 1).join("0") + c.random_number(a)).slice(-b)
      };
      c.getOrigin = function (a) {
        return (a + "/").split("/").slice(0, 3).join("/")
      };
      c.isSameOriginUrl = function (a, b) {
        return b || (b = g.location.href), a.split("/").slice(0, 3).join("/") === b.split("/").slice(0, 3).join("/")
      };
      c.getParentDomain = function (a) {
        return /^[0-9.]*$/.test(a) || /^\[/.test(a) || !/[.]/.test(a) ? a :
            a.split(".").slice(1).join(".")
      };
      c.objectExtend = function (a, b) {
        for (var c in b)b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
      };
      c.polluteGlobalNamespace = function () {
        "_jp" in g || (g._jp = {})
      };
      c.closeFrame = function (a, b) {
        return "c" + JSON.stringify([a, b])
      };
      c.userSetCode = function (a) {
        return 1E3 === a || 3E3 <= a && 4999 >= a
      };
      c.countRTO = function (a) {
        var b;
        return 100 < a ? b = 3 * a : b = a + 200, b
      };
      c.log = function () {
        g.console && console.log && console.log.apply && console.log.apply(console, arguments)
      };
      c.bind = function (a, b) {
        return a.bind ? a.bind(b) : function () {
          return a.apply(b,
              arguments)
        }
      };
      c.flatUrl = function (a) {
        return -1 === a.indexOf("?") && -1 === a.indexOf("#")
      };
      c.amendUrl = function (a) {
        var b = j.location;
        if (!a)throw Error("Wrong url for SockJS");
        if (!c.flatUrl(a))throw Error("Only basic urls are supported in SockJS");
        return 0 === a.indexOf("//") && (a = b.protocol + a), 0 === a.indexOf("/") && (a = b.protocol + "//" + b.host + a), a = a.replace(/[/]+$/, ""), a
      };
      c.arrIndexOf = function (a, b) {
        for (var c = 0; c < a.length; c++)if (a[c] === b)return c;
        return -1
      };
      c.arrSkip = function (a, b) {
        var f = c.arrIndexOf(a, b);
        return -1 ===
        f ? a.slice() : a.slice(0, f).concat(a.slice(f + 1))
      };
      c.isArray = Array.isArray || function (a) {
            return 0 <= {}.toString.call(a).indexOf("Array")
          };
      c.delay = function (a, b) {
        return "function" == typeof a && (b = a, a = 0), setTimeout(b, a)
      };
      var v = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, D = {
            "\x00": "\\u0000",
            "\u0001": "\\u0001",
            "\u0002": "\\u0002",
            "\u0003": "\\u0003",
            "\u0004": "\\u0004",
            "\u0005": "\\u0005",
            "\u0006": "\\u0006",
            "\u0007": "\\u0007",
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\x0B": "\\u000b",
            "\f": "\\f",
            "\r": "\\r",
            "\u000e": "\\u000e",
            "\u000f": "\\u000f",
            "\u0010": "\\u0010",
            "\u0011": "\\u0011",
            "\u0012": "\\u0012",
            "\u0013": "\\u0013",
            "\u0014": "\\u0014",
            "\u0015": "\\u0015",
            "\u0016": "\\u0016",
            "\u0017": "\\u0017",
            "\u0018": "\\u0018",
            "\u0019": "\\u0019",
            "\u001a": "\\u001a",
            "\u001b": "\\u001b",
            "\u001c": "\\u001c",
            "\u001d": "\\u001d",
            "\u001e": "\\u001e",
            "\u001f": "\\u001f",
            '"': '\\"',
            "\\": "\\\\",
            "\u007f": "\\u007f",
            "\u0080": "\\u0080",
            "\u0081": "\\u0081",
            "\u0082": "\\u0082",
            "\u0083": "\\u0083",
            "\u0084": "\\u0084",
            "\u0085": "\\u0085",
            "\u0086": "\\u0086",
            "\u0087": "\\u0087",
            "\u0088": "\\u0088",
            "\u0089": "\\u0089",
            "\u008a": "\\u008a",
            "\u008b": "\\u008b",
            "\u008c": "\\u008c",
            "\u008d": "\\u008d",
            "\u008e": "\\u008e",
            "\u008f": "\\u008f",
            "\u0090": "\\u0090",
            "\u0091": "\\u0091",
            "\u0092": "\\u0092",
            "\u0093": "\\u0093",
            "\u0094": "\\u0094",
            "\u0095": "\\u0095",
            "\u0096": "\\u0096",
            "\u0097": "\\u0097",
            "\u0098": "\\u0098",
            "\u0099": "\\u0099",
            "\u009a": "\\u009a",
            "\u009b": "\\u009b",
            "\u009c": "\\u009c",
            "\u009d": "\\u009d",
            "\u009e": "\\u009e",
            "\u009f": "\\u009f",
            "\u00ad": "\\u00ad",
            "\u0600": "\\u0600",
            "\u0601": "\\u0601",
            "\u0602": "\\u0602",
            "\u0603": "\\u0603",
            "\u0604": "\\u0604",
            "\u070f": "\\u070f",
            "\u17b4": "\\u17b4",
            "\u17b5": "\\u17b5",
            "\u200c": "\\u200c",
            "\u200d": "\\u200d",
            "\u200e": "\\u200e",
            "\u200f": "\\u200f",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029",
            "\u202a": "\\u202a",
            "\u202b": "\\u202b",
            "\u202c": "\\u202c",
            "\u202d": "\\u202d",
            "\u202e": "\\u202e",
            "\u202f": "\\u202f",
            "\u2060": "\\u2060",
            "\u2061": "\\u2061",
            "\u2062": "\\u2062",
            "\u2063": "\\u2063",
            "\u2064": "\\u2064",
            "\u2065": "\\u2065",
            "\u2066": "\\u2066",
            "\u2067": "\\u2067",
            "\u2068": "\\u2068",
            "\u2069": "\\u2069",
            "\u206a": "\\u206a",
            "\u206b": "\\u206b",
            "\u206c": "\\u206c",
            "\u206d": "\\u206d",
            "\u206e": "\\u206e",
            "\u206f": "\\u206f",
            "\ufeff": "\\ufeff",
            "\ufff0": "\\ufff0",
            "\ufff1": "\\ufff1",
            "\ufff2": "\\ufff2",
            "\ufff3": "\\ufff3",
            "\ufff4": "\\ufff4",
            "\ufff5": "\\ufff5",
            "\ufff6": "\\ufff6",
            "\ufff7": "\\ufff7",
            "\ufff8": "\\ufff8",
            "\ufff9": "\\ufff9",
            "\ufffa": "\\ufffa",
            "\ufffb": "\\ufffb",
            "\ufffc": "\\ufffc",
            "\ufffd": "\\ufffd",
            "\ufffe": "\\ufffe",
            "\uffff": "\\uffff"
          }, r = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,
          B, M = JSON && JSON.stringify || function (a) {
                return v.lastIndex = 0, v.test(a) && (a = a.replace(v, function (a) {
                  return D[a]
                })), '"' + a + '"'
              };
      c.quote = function (a) {
        a = M(a);
        r.lastIndex = 0;
        if (r.test(a)) {
          if (!B) {
            var b, c = {}, d = [];
            for (b = 0; 65536 > b; b++)d.push(String.fromCharCode(b));
            B = (r.lastIndex = 0, d.join("").replace(r, function (a) {
              return c[a] = "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4), ""
            }), r.lastIndex = 0, c)
          }
          a = a.replace(r, function (a) {
            return B[a]
          })
        }
        return a
      };
      var q = "websocket xdr-streaming xhr-streaming iframe-eventsource iframe-htmlfile xdr-polling xhr-polling iframe-xhr-polling jsonp-polling".split(" ");
      c.probeProtocols = function () {
        for (var a = {}, b = 0; b < q.length; b++) {
          var c = q[b];
          a[c] = e[c] && e[c].enabled()
        }
        return a
      };
      c.detectProtocols = function (a, b, c) {
        var d = {}, h = [];
        b || (b = q);
        for (var m = 0; m < b.length; m++) {
          var g = b[m];
          d[g] = a[g]
        }
        var e = function (a) {
          var b = a.shift();
          d[b] ? h.push(b) : 0 < a.length && e(a)
        };
        return !1 !== c.websocket && e(["websocket"]), d["xhr-streaming"] && !c.null_origin ? h.push("xhr-streaming") : d["xdr-streaming"] && !c.cookie_needed && !c.null_origin ? h.push("xdr-streaming") : e(["iframe-eventsource", "iframe-htmlfile"]),
            d["xhr-polling"] && !c.null_origin ? h.push("xhr-polling") : d["xdr-polling"] && !c.cookie_needed && !c.null_origin ? h.push("xdr-polling") : e(["iframe-xhr-polling", "jsonp-polling"]), h
      };
      c.createHook = function () {
        var a = "a" + c.random_string(8);
        if (!("_sockjs_global" in g)) {
          var b = {};
          g._sockjs_global = function (a) {
            return a in b || (b[a] = {
              id: a, del: function () {
                delete b[a]
              }
            }), b[a]
          }
        }
        return g._sockjs_global(a)
      };
      c.attachMessage = function (a) {
        c.attachEvent("message", a)
      };
      c.attachEvent = function (a, b) {
        "undefined" != typeof g.addEventListener ?
            g.addEventListener(a, b, !1) : (j.attachEvent("on" + a, b), g.attachEvent("on" + a, b))
      };
      c.detachMessage = function (a) {
        c.detachEvent("message", a)
      };
      c.detachEvent = function (a, b) {
        "undefined" != typeof g.addEventListener ? g.removeEventListener(a, b, !1) : (j.detachEvent("on" + a, b), g.detachEvent("on" + a, b))
      };
      var t = {}, C = !1, x = function () {
        for (var a in t)t[a](), delete t[a]
      }, i = function () {
        C || (C = !0, x())
      };
      c.attachEvent("beforeunload", i);
      c.attachEvent("unload", i);
      c.unload_add = function (a) {
        var b = c.random_string(8);
        return t[b] = a, C && c.delay(x),
            b
      };
      c.unload_del = function (a) {
        a in t && delete t[a]
      };
      c.createIframe = function (a, b) {
        var f = j.createElement("iframe"), d, h, m = function () {
          clearTimeout(d);
          try {
            f.onload = null
          } catch (a) {
          }
          f.onerror = null
        }, g = function () {
          f && (m(), setTimeout(function () {
            f && f.parentNode.removeChild(f);
            f = null
          }, 0), c.unload_del(h))
        };
        return f.src = a, f.style.display = "none", f.style.position = "absolute", f.onerror = function () {
          f && (g(), b("onerror"))
        }, f.onload = function () {
          clearTimeout(d);
          d = setTimeout(function () {
            f && (g(), b("onload timeout"))
          }, 2E3)
        }, j.body.appendChild(f),
            d = setTimeout(function () {
              f && (g(), b("timeout"))
            }, 15E3), h = c.unload_add(g), {
          post: function (a, b) {
            try {
              f && f.contentWindow && f.contentWindow.postMessage(a, b)
            } catch (c) {
            }
          }, cleanup: g, loaded: m
        }
      };
      c.createHtmlfile = function (a, b) {
        var f = new ActiveXObject("htmlfile"), d, h, m, e = function () {
          clearTimeout(d)
        }, j = function () {
          f && (e(), c.unload_del(h), m.parentNode.removeChild(m), m = f = null, CollectGarbage())
        };
        f.open();
        f.write('<html><script>document.domain="' + document.domain + '";<\/script></html>');
        f.close();
        f.parentWindow._jp = g._jp;
        var i = f.createElement("div");
        return f.body.appendChild(i), m = f.createElement("iframe"), i.appendChild(m), m.src = a, d = setTimeout(function () {
          f && (j(), b("timeout"))
        }, 15E3), h = c.unload_add(j), {
          post: function (a, b) {
            try {
              m && m.contentWindow && m.contentWindow.postMessage(a, b)
            } catch (c) {
            }
          }, cleanup: j, loaded: e
        }
      };
      i = function () {
      };
      i.prototype = new k(["chunk", "finish"]);
      i.prototype._start = function (a, b, f, d) {
        var h = this;
        try {
          h.xhr = new XMLHttpRequest
        } catch (m) {
        }
        if (!h.xhr)try {
          h.xhr = new g.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
        }
        if (g.ActiveXObject || g.XDomainRequest)b += (-1 === b.indexOf("?") ? "?" : "&") + "t=" + +new Date;
        h.unload_ref = c.unload_add(function () {
          h._cleanup(!0)
        });
        try {
          h.xhr.open(a, b, !0)
        } catch (j) {
          h.emit("finish", 0, "");
          h._cleanup();
          return
        }
        if (!d || !d.no_credentials)h.xhr.withCredentials = "true";
        if (d && d.headers)for (var i in d.headers)h.xhr.setRequestHeader(i, d.headers[i]);
        h.xhr.onreadystatechange = function () {
          if (h.xhr) {
            var a = h.xhr;
            switch (a.readyState) {
              case 3:
                try {
                  var b = a.status, c = a.responseText
                } catch (d) {
                }
                c && 0 < c.length && h.emit("chunk", b, c);
                break;
              case 4:
                h.emit("finish",
                    a.status, a.responseText), h._cleanup(!1)
            }
          }
        };
        h.xhr.send(f)
      };
      i.prototype._cleanup = function (a) {
        if (this.xhr) {
          c.unload_del(this.unload_ref);
          this.xhr.onreadystatechange = function () {
          };
          if (a)try {
            this.xhr.abort()
          } catch (b) {
          }
          this.unload_ref = this.xhr = null
        }
      };
      i.prototype.close = function () {
        this.nuke();
        this._cleanup(!0)
      };
      (c.XHRCorsObject = function () {
        var a = this, b = arguments;
        c.delay(function () {
          a._start.apply(a, b)
        })
      }).prototype = new i;
      (c.XHRLocalObject = function (a, b, f) {
        var d = this;
        c.delay(function () {
          d._start(a, b, f, {no_credentials: !0})
        })
      }).prototype =
          new i;
      i = c.XDRObject = function (a, b, f) {
        var d = this;
        c.delay(function () {
          d._start(a, b, f)
        })
      };
      i.prototype = new k(["chunk", "finish"]);
      i.prototype._start = function (a, b, f) {
        var d = this, h = new XDomainRequest, b = b + ((-1 === b.indexOf("?") ? "?" : "&") + "t=" + +new Date), g = h.ontimeout = h.onerror = function () {
          d.emit("finish", 0, "");
          d._cleanup(!1)
        };
        h.onprogress = function () {
          d.emit("chunk", 200, h.responseText)
        };
        h.onload = function () {
          d.emit("finish", 200, h.responseText);
          d._cleanup(!1)
        };
        d.xdr = h;
        d.unload_ref = c.unload_add(function () {
          d._cleanup(!0)
        });
        try {
          d.xdr.open(a, b), d.xdr.send(f)
        } catch (e) {
          g()
        }
      };
      i.prototype._cleanup = function (a) {
        if (this.xdr) {
          c.unload_del(this.unload_ref);
          this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
          if (a)try {
            this.xdr.abort()
          } catch (b) {
          }
          this.unload_ref = this.xdr = null
        }
      };
      i.prototype.close = function () {
        this.nuke();
        this._cleanup(!0)
      };
      c.isXHRCorsCapable = function () {
        return g.XMLHttpRequest && "withCredentials" in new XMLHttpRequest ? 1 : g.XDomainRequest && j.domain ? 2 : s.enabled() ? 3 : 4
      };
      var e = function (a, b, f) {
        var d = this,
            h;
        d._options = {devel: !1, debug: !1, protocols_whitelist: [], info: void 0, rtt: void 0};
        f && c.objectExtend(d._options, f);
        d._base_url = c.amendUrl(a);
        d._server = d._options.server || c.random_number_string(1E3);
        d._options.protocols_whitelist && d._options.protocols_whitelist.length ? h = d._options.protocols_whitelist : ("string" == typeof b && 0 < b.length ? h = [b] : c.isArray(b) ? h = b : h = null, h && d._debug('Deprecated API: Use "protocols_whitelist" option instead of supplying protocol list as a second parameter to SockJS constructor.'));
        d._protocols = [];
        d.protocol = null;
        d.readyState = e.CONNECTING;
        d._ir = N(d._base_url);
        d._ir.onfinish = function (a, b) {
          d._ir = null;
          a ? (d._options.info && (a = c.objectExtend(a, d._options.info)), d._options.rtt && (b = d._options.rtt), d._applyInfo(a, b, h), d._didClose()) : d._didClose(1002, "Can't connect to server", !0)
        }
      };
      e.prototype = new p;
      e.version = "0.3.2";
      e.CONNECTING = 0;
      e.OPEN = 1;
      e.CLOSING = 2;
      e.CLOSED = 3;
      e.prototype._debug = function () {
        this._options.debug && c.log.apply(c, arguments)
      };
      e.prototype._dispatchOpen = function () {
        this.readyState ===
        e.CONNECTING ? (this._transport_tref && (clearTimeout(this._transport_tref), this._transport_tref = null), this.readyState = e.OPEN, this.dispatchEvent(new n("open"))) : this._didClose(1006, "Server lost session")
      };
      e.prototype._dispatchMessage = function (a) {
        this.readyState === e.OPEN && this.dispatchEvent(new n("message", {data: a}))
      };
      e.prototype._dispatchHeartbeat = function () {
        this.readyState === e.OPEN && this.dispatchEvent(new n("heartbeat", {}))
      };
      e.prototype._didClose = function (a, b, f) {
        var d = this;
        if (d.readyState !== e.CONNECTING &&
            d.readyState !== e.OPEN && d.readyState !== e.CLOSING)throw Error("INVALID_STATE_ERR");
        d._ir && (d._ir.nuke(), d._ir = null);
        d._transport && (d._transport.doCleanup(), d._transport = null);
        var h = new n("close", {code: a, reason: b, wasClean: c.userSetCode(a)});
        if (!c.userSetCode(a) && d.readyState === e.CONNECTING && !f) {
          if (d._try_next_protocol(h))return;
          h = new n("close", {code: 2E3, reason: "All transports failed", wasClean: !1, last_event: h})
        }
        d.readyState = e.CLOSED;
        c.delay(function () {
          d.dispatchEvent(h)
        })
      };
      e.prototype._didMessage = function (a) {
        switch (a.slice(0,
            1)) {
          case "o":
            this._dispatchOpen();
            break;
          case "a":
            for (var a = JSON.parse(a.slice(1) || "[]"), b = 0; b < a.length; b++)this._dispatchMessage(a[b]);
            break;
          case "m":
            a = JSON.parse(a.slice(1) || "null");
            this._dispatchMessage(a);
            break;
          case "c":
            a = JSON.parse(a.slice(1) || "[]");
            this._didClose(a[0], a[1]);
            break;
          case "h":
            this._dispatchHeartbeat()
        }
      };
      e.prototype._try_next_protocol = function (a) {
        var b = this;
        b.protocol && (b._debug("Closed transport:", b.protocol, "" + a), b.protocol = null);
        for (b._transport_tref && (clearTimeout(b._transport_tref),
            b._transport_tref = null); ;) {
          a = b.protocol = b._protocols.shift();
          if (!a)return !1;
          if (e[a] && !0 === e[a].need_body && (!j.body || "undefined" != typeof j.readyState && "complete" !== j.readyState))return b._protocols.unshift(a), b.protocol = "waiting-for-load", c.attachEvent("load", function () {
            b._try_next_protocol()
          }), !0;
          if (e[a] && e[a].enabled(b._options)) {
            b._transport_tref = c.delay((b._options.rto || 0) * (e[a].roundTrips || 1) || 5E3, function () {
              b.readyState === e.CONNECTING && b._didClose(2007, "Transport timeouted")
            });
            var f = c.random_string(8),
                f = b._base_url + "/" + b._server + "/" + f;
            return b._debug("Opening transport:", a, " url:" + f, " RTO:" + b._options.rto), b._transport = new e[a](b, f, b._base_url), !0
          }
          b._debug("Skipping transport:", a)
        }
      };
      e.prototype.close = function (a, b) {
        if (a && !c.userSetCode(a))throw Error("INVALID_ACCESS_ERR");
        return this.readyState !== e.CONNECTING && this.readyState !== e.OPEN ? !1 : (this.readyState = e.CLOSING, this._didClose(a || 1E3, b || "Normal closure"), !0)
      };
      e.prototype.send = function (a) {
        if (this.readyState === e.CONNECTING)throw Error("INVALID_STATE_ERR");
        return this.readyState === e.OPEN && this._transport.doSend(c.quote("" + a)), !0
      };
      e.prototype._applyInfo = function (a, b, f) {
        this._options.info = a;
        this._options.rtt = b;
        this._options.rto = c.countRTO(b);
        this._options.info.null_origin = !j.domain;
        b = c.probeProtocols();
        this._protocols = c.detectProtocols(b, f, a)
      };
      i = e.websocket = function (a, b) {
        var f = this, d = b + "/websocket";
        "https" === d.slice(0, 5) ? d = "wss" + d.slice(5) : d = "ws" + d.slice(4);
        f.ri = a;
        f.url = d;
        f.ws = new (g.WebSocket || g.MozWebSocket)(f.url);
        f.ws.onmessage = function (a) {
          if (typeof a !== 'undefined' && typeof a.data !== 'undefined') {
            f.ri._didMessage(a.data)
          }
        };
        f.unload_ref = c.unload_add(function () {
          f.ws.close()
        });
        f.ws.onclose = function () {
          f.ri._didMessage(c.closeFrame(1006, "WebSocket connection broken"))
        }
      };
      i.prototype.doSend = function (a) {
        this.ws.send("[" + a + "]")
      };
      i.prototype.doCleanup = function () {
        var a = this.ws;
        a && (a.onmessage = a.onclose = null, a.close(), c.unload_del(this.unload_ref), this.unload_ref = this.ri = this.ws = null)
      };
      i.enabled = function () {
        return !!g.WebSocket || !!g.MozWebSocket
      };
      i.roundTrips = 2;
      var l = function () {
      };
      l.prototype.send_constructor = function (a) {
        this.send_buffer =
            [];
        this.sender = a
      };
      l.prototype.doSend = function (a) {
        this.send_buffer.push(a);
        this.send_stop || this.send_schedule()
      };
      l.prototype.send_schedule_wait = function () {
        var a = this, b;
        a.send_stop = function () {
          a.send_stop = null;
          clearTimeout(b)
        };
        b = c.delay(25, function () {
          a.send_stop = null;
          a.send_schedule()
        })
      };
      l.prototype.send_schedule = function () {
        var a = this;
        if (0 < a.send_buffer.length) {
          var b = "[" + a.send_buffer.join(",") + "]";
          a.send_stop = a.sender(a.trans_url, b, function () {
            a.send_stop = null;
            a.send_schedule_wait()
          });
          a.send_buffer =
              []
        }
      };
      l.prototype.send_destructor = function () {
        this._send_stop && this._send_stop();
        this._send_stop = null
      };
      var O = function (a, b, f) {
        if (!("_send_form" in this)) {
          var d = this._send_form = j.createElement("form"), h = this._send_area = j.createElement("textarea");
          h.name = "d";
          d.style.display = "none";
          d.style.position = "absolute";
          d.method = "POST";
          d.enctype = "application/x-www-form-urlencoded";
          d.acceptCharset = "UTF-8";
          d.appendChild(h);
          j.body.appendChild(d)
        }
        var d = this._send_form, h = this._send_area, g = "a" + c.random_string(8);
        d.target =
            g;
        d.action = a + "/jsonp_send?i=" + g;
        var e;
        try {
          e = j.createElement('<iframe name="' + g + '">')
        } catch (i) {
          e = j.createElement("iframe"), e.name = g
        }
        e.id = g;
        d.appendChild(e);
        e.style.display = "none";
        try {
          h.value = b
        } catch (k) {
          c.log("Your browser is seriously broken. Go home! " + k.message)
        }
        d.submit();
        var l = function () {
          e.onerror && (e.onreadystatechange = e.onerror = e.onload = null, c.delay(500, function () {
            e.parentNode.removeChild(e);
            e = null
          }), h.value = "", f())
        };
        return e.onerror = e.onload = l, e.onreadystatechange = function () {
          "complete" == e.readyState &&
          l()
        }, l
      }, P = function (a) {
        return function (b, c, d) {
          return (new a("POST", b + "/xhr_send", c)).onfinish = function (a) {
            d(a)
          }, function (a) {
            d(0, a)
          }
        }
      }, i = e["jsonp-polling"] = function (a, b) {
        c.polluteGlobalNamespace();
        this.ri = a;
        this.trans_url = b;
        this.send_constructor(O);
        this._schedule_recv()
      };
      i.prototype = new l;
      i.prototype._schedule_recv = function () {
        var a = this, b = a.trans_url + "/jsonp", f = "a" + c.random_string(6), b = b + "?c=" + escape("_jp." + f), d = function (b) {
          delete g._jp[f];
          a._recv_stop = null;
          b && (a._is_closing || a.ri._didMessage(b));
          a._is_closing ||
          a._schedule_recv()
        }, e, m = j.createElement("script"), i, k = function (a) {
          i && (i.parentNode.removeChild(i), i = null);
          m && (clearTimeout(e), m.parentNode.removeChild(m), m.onreadystatechange = m.onerror = m.onload = m.onclick = null, m = null, d(a), d = null)
        }, l = !1, p = null;
        m.id = "a" + c.random_string(8);
        m.src = b;
        m.type = "text/javascript";
        m.charset = "UTF-8";
        m.onerror = function () {
          p || (p = setTimeout(function () {
            l || k(c.closeFrame(1006, "JSONP script loaded abnormally (onerror)"))
          }, 1E3))
        };
        m.onload = function () {
          k(c.closeFrame(1006, "JSONP script loaded abnormally (onload)"))
        };
        m.onreadystatechange = function () {
          if (/loaded|closed/.test(m.readyState)) {
            if (m && m.htmlFor && m.onclick) {
              l = !0;
              try {
                m.onclick()
              } catch (a) {
              }
            }
            m && k(c.closeFrame(1006, "JSONP script loaded abnormally (onreadystatechange)"))
          }
        };
        if ("undefined" == typeof m.async && j.attachEvent)if (/opera/i.test(navigator.userAgent))i = j.createElement("script"), i.text = "try{var a = document.getElementById('" + m.id + "'); if(a)a.onerror();}catch(x){};", m.async = i.async = !1; else {
          try {
            m.htmlFor = m.id, m.event = "onclick"
          } catch (n) {
          }
          m.async = !0
        }
        "undefined" != typeof m.async && (m.async = !0);
        e = setTimeout(function () {
          k(c.closeFrame(1006, "JSONP script loaded abnormally (timeout)"))
        }, 35E3);
        b = j.getElementsByTagName("head")[0];
        b = (b.insertBefore(m, b.firstChild), i && b.insertBefore(i, b.firstChild), k);
        g._jp[f] = b;
        a._recv_stop = function () {
          g._jp[f] && g._jp[f](c.closeFrame(1E3, "JSONP user aborted read"))
        }
      };
      i.enabled = function () {
        return !0
      };
      i.need_body = !0;
      i.prototype.doCleanup = function () {
        this._is_closing = !0;
        this._recv_stop && this._recv_stop();
        this.ri = this._recv_stop = null;
        this.send_destructor()
      };
      i = function () {
      };
      i.prototype = new l;
      i.prototype.run = function (a, b, c, d, e) {
        this.ri = a;
        this.trans_url = b;
        this.send_constructor(P(e));
        this.poll = new E(a, d, b + c, e)
      };
      i.prototype.doCleanup = function () {
        this.poll && (this.poll.abort(), this.poll = null)
      };
      var w = e["xhr-streaming"] = function (a, b) {
        this.run(a, b, "/xhr_streaming", y, c.XHRCorsObject)
      };
      w.prototype = new i;
      w.enabled = function () {
        return g.XMLHttpRequest && "withCredentials" in new XMLHttpRequest && !/opera/i.test(navigator.userAgent)
      };
      w.roundTrips = 2;
      w.need_body = !0;
      l = e["xdr-streaming"] =
          function (a, b) {
            this.run(a, b, "/xhr_streaming", y, c.XDRObject)
          };
      l.prototype = new i;
      l.enabled = function () {
        return !!g.XDomainRequest
      };
      l.roundTrips = 2;
      var F = e["xhr-polling"] = function (a, b) {
        this.run(a, b, "/xhr", y, c.XHRCorsObject)
      };
      F.prototype = new i;
      F.enabled = w.enabled;
      F.roundTrips = 2;
      w = e["xdr-polling"] = function (a, b) {
        this.run(a, b, "/xhr", y, c.XDRObject)
      };
      w.prototype = new i;
      w.enabled = l.enabled;
      w.roundTrips = 2;
      var s = function () {
      };
      s.prototype.i_constructor = function (a, b, f) {
        var d = this;
        d.ri = a;
        d.origin = c.getOrigin(f);
        d.base_url =
            f;
        d.trans_url = b;
        a = f + "/iframe.html";
        d.ri._options.devel && (a += "?t=" + +new Date);
        d.window_id = c.random_string(8);
        a += "#" + d.window_id;
        d.iframeObj = c.createIframe(a, function (a) {
          d.ri._didClose(1006, "Unable to load an iframe (" + a + ")")
        });
        d.onmessage_cb = c.bind(d.onmessage, d);
        c.attachMessage(d.onmessage_cb)
      };
      s.prototype.doCleanup = function () {
        if (this.iframeObj) {
          c.detachMessage(this.onmessage_cb);
          try {
            this.iframeObj.iframe.contentWindow && this.postMessage("c")
          } catch (a) {
          }
          this.iframeObj.cleanup();
          this.onmessage_cb = this.iframeObj =
              this.iframeObj = null
        }
      };
      s.prototype.onmessage = function (a) {
        if (a.origin === this.origin) {
          var b = a.data.slice(0, 8), c = a.data.slice(8, 9), a = a.data.slice(9);
          if (b === this.window_id)switch (c) {
            case "s":
              this.iframeObj.loaded();
              this.postMessage("s", JSON.stringify([e.version, this.protocol, this.trans_url, this.base_url]));
              break;
            case "t":
              this.ri._didMessage(a)
          }
        }
      };
      s.prototype.postMessage = function (a, b) {
        this.iframeObj.post(this.window_id + a + (b || ""), this.origin)
      };
      s.prototype.doSend = function (a) {
        this.postMessage("m", a)
      };
      s.enabled =
          function () {
            var a = navigator && navigator.userAgent && -1 !== navigator.userAgent.indexOf("Konqueror");
            return ("function" == typeof g.postMessage || "object" == typeof g.postMessage) && !a
          };
      var G, H = function (a, b) {
        parent !== g ? parent.postMessage(G + a + (b || ""), "*") : c.log("Can't postMessage, no parent window.", a, b)
      }, u = function () {
      };
      u.prototype._didClose = function (a, b) {
        H("t", c.closeFrame(a, b))
      };
      u.prototype._didMessage = function (a) {
        H("t", a)
      };
      u.prototype._doSend = function (a) {
        this._transport.doSend(a)
      };
      u.prototype._doCleanup = function () {
        this._transport.doCleanup()
      };
      c.parent_origin = void 0;
      e.bootstrap_iframe = function () {
        var a;
        G = j.location.hash.slice(1);
        c.attachMessage(function (b) {
          if (b.source === parent && ("undefined" == typeof c.parent_origin && (c.parent_origin = b.origin), b.origin === c.parent_origin)) {
            var f = b.data.slice(0, 8), d = b.data.slice(8, 9), b = b.data.slice(9);
            if (f === G)switch (d) {
              case "s":
                var h = JSON.parse(b), f = h[0], d = h[1], b = h[2], h = h[3];
                f !== e.version && c.log('Incompatibile SockJS! Main site uses: "' + f + '", the iframe: "' + e.version + '".');
                if (!c.flatUrl(b) || !c.flatUrl(h)) {
                  c.log("Only basic urls are supported in SockJS");
                  break
                }
                if (!c.isSameOriginUrl(b) || !c.isSameOriginUrl(h)) {
                  c.log("Can't connect to different domain from within an iframe. (" + JSON.stringify([g.location.href, b, h]) + ")");
                  break
                }
                a = new u;
                a._transport = new u[d](a, b, h);
                break;
              case "m":
                a._doSend(b);
                break;
              case "c":
                a && a._doCleanup(), a = null
            }
          }
        });
        H("s")
      };
      var z = function (a, b) {
        var f = this;
        c.delay(function () {
          f.doXhr(a, b)
        })
      };
      z.prototype = new k(["finish"]);
      z.prototype.doXhr = function (a, b) {
        var f = this, d = (new Date).getTime(), e = new b("GET", a + "/info"), g = c.delay(8E3, function () {
          e.ontimeout()
        });
        e.onfinish = function (a, b) {
          clearTimeout(g);
          g = null;
          if (200 === a) {
            var c = (new Date).getTime() - d, e = JSON.parse(b);
            "object" != typeof e && (e = {});
            f.emit("finish", e, c)
          } else f.emit("finish")
        };
        e.ontimeout = function () {
          e.close();
          f.emit("finish")
        }
      };
      var K = function (a) {
        var b = this, f = function () {
          var c = new s;
          c.protocol = "w-iframe-info-receiver";
          var f = function (a) {
            "string" == typeof a && "m" === a.substr(0, 1) ? (a = JSON.parse(a.substr(1)), b.emit("finish", a[0], a[1])) : b.emit("finish");
            c.doCleanup();
            c = null
          };
          c.i_constructor({
            _options: {}, _didClose: f,
            _didMessage: f
          }, a, a)
        };
        j.body ? f() : c.attachEvent("load", f)
      };
      K.prototype = new k(["finish"]);
      var L = function () {
        var a = this;
        c.delay(function () {
          a.emit("finish", {}, 2E3)
        })
      };
      L.prototype = new k(["finish"]);
      var N = function (a) {
        if (c.isSameOriginUrl(a))return new z(a, c.XHRLocalObject);
        switch (c.isXHRCorsCapable()) {
          case 1:
            return new z(a, c.XHRLocalObject);
          case 2:
            return new z(a, c.XDRObject);
          case 3:
            return new K(a);
          default:
            return new L
        }
      };
      (u["w-iframe-info-receiver"] = function (a, b, f) {
        (new z(f, c.XHRLocalObject)).onfinish = function (b,
                                                          c) {
          a._didMessage("m" + JSON.stringify([b, c]));
          a._didClose()
        }
      }).prototype.doCleanup = function () {
      };
      k = e["iframe-eventsource"] = function () {
        this.protocol = "w-iframe-eventsource";
        this.i_constructor.apply(this, arguments)
      };
      k.prototype = new s;
      k.enabled = function () {
        return "EventSource" in g && s.enabled()
      };
      k.need_body = !0;
      k.roundTrips = 3;
      (u["w-iframe-eventsource"] = function (a, b) {
        this.run(a, b, "/eventsource", I, c.XHRLocalObject)
      }).prototype = new i;
      k = e["iframe-xhr-polling"] = function () {
        this.protocol = "w-iframe-xhr-polling";
        this.i_constructor.apply(this,
            arguments)
      };
      k.prototype = new s;
      k.enabled = function () {
        return g.XMLHttpRequest && s.enabled()
      };
      k.need_body = !0;
      k.roundTrips = 3;
      (u["w-iframe-xhr-polling"] = function (a, b) {
        this.run(a, b, "/xhr", y, c.XHRLocalObject)
      }).prototype = new i;
      k = e["iframe-htmlfile"] = function () {
        this.protocol = "w-iframe-htmlfile";
        this.i_constructor.apply(this, arguments)
      };
      k.prototype = new s;
      k.enabled = function () {
        return s.enabled()
      };
      k.need_body = !0;
      k.roundTrips = 3;
      (u["w-iframe-htmlfile"] = function (a, b) {
        this.run(a, b, "/htmlfile", J, c.XHRLocalObject)
      }).prototype =
          new i;
      var E = function (a, b, c, d) {
        this.ri = a;
        this.Receiver = b;
        this.recv_url = c;
        this.AjaxObject = d;
        this._scheduleRecv()
      };
      E.prototype._scheduleRecv = function () {
        var a = this, b = a.poll = new a.Receiver(a.recv_url, a.AjaxObject);
        b.onmessage = function (b) {
          a.ri._didMessage(b.data)
        };
        b.onclose = function (c) {
          a.poll = b = b.onmessage = b.onclose = null;
          a.poll_is_closing || ("permanent" === c.reason ? a.ri._didClose(1006, "Polling error (" + c.reason + ")") : a._scheduleRecv())
        }
      };
      E.prototype.abort = function () {
        this.poll_is_closing = !0;
        this.poll && this.poll.abort()
      };
      var I = function (a) {
        var b = this, f = new EventSource(a);
        f.onmessage = function (a) {
          b.dispatchEvent(new n("message", {data: unescape(a.data)}))
        };
        b.es_close = f.onerror = function (a, e) {
          var g = e ? "user" : 2 !== f.readyState ? "network" : "permanent";
          b.es_close = f.onmessage = f.onerror = null;
          f.close();
          f = null;
          c.delay(200, function () {
            b.dispatchEvent(new n("close", {reason: g}))
          })
        }
      };
      I.prototype = new p;
      I.prototype.abort = function () {
        this.es_close && this.es_close({}, !0)
      };
      var A, J = function (a) {
        var b = this;
        c.polluteGlobalNamespace();
        b.id = "a" + c.random_string(6,
                26);
        a += (-1 === a.indexOf("?") ? "?" : "&") + "c=" + escape("_jp." + b.id);
        if (void 0 === A)if ("ActiveXObject" in g)try {
          A = !!new ActiveXObject("htmlfile")
        } catch (f) {
        } else A = !1;
        var d = A ? c.createHtmlfile : c.createIframe, e;
        g._jp[b.id] = {
          start: function () {
            e.loaded()
          }, message: function (a) {
            b.dispatchEvent(new n("message", {data: a}))
          }, stop: function () {
            b.iframe_close({}, "network")
          }
        };
        b.iframe_close = function (a, c) {
          e.cleanup();
          b.iframe_close = e = null;
          delete g._jp[b.id];
          b.dispatchEvent(new n("close", {reason: c}))
        };
        e = d(a, function () {
          b.iframe_close({},
              "permanent")
        })
      };
      J.prototype = new p;
      J.prototype.abort = function () {
        this.iframe_close && this.iframe_close({}, "user")
      };
      var y = function (a, b) {
        var c = this, d = 0;
        c.xo = new b("POST", a, null);
        c.xo.onchunk = function (a, b) {
          if (200 === a)for (; ;) {
            var e = b.slice(d), g = e.indexOf("\n");
            if (-1 === g)break;
            d += g + 1;
            e = e.slice(0, g);
            c.dispatchEvent(new n("message", {data: e}))
          }
        };
        c.xo.onfinish = function (a, b) {
          c.xo.onchunk(a, b);
          c.xo = null;
          c.dispatchEvent(new n("close", {reason: 200 === a ? "network" : "permanent"}))
        }
      };
      return y.prototype = new p, y.prototype.abort =
          function () {
            this.xo && (this.xo.close(), this.dispatchEvent(new n("close", {reason: "user"})), this.xo = null)
          }, e.getUtils = function () {
        return c
      }, e.getIframeTransport = function () {
        return s
      }, e
    }();

    "_sockjs_onload" in window && setTimeout(_sockjs_onload, 1);

    "function" == typeof define && define.amd && define("sockjs", [], function () {
      return SockJS;
    });

    function WebTCP(j, g, hostSocket) {
      this.myHostSocket = hostSocket;
      this.sockets = {};
      this.httpClients = {};
      this.sock = new SockJS("http://" + j + ":" + g + "/bridge");
      this.ready = !1;
      this.outputBuffer = [];
      this.sID;
      var c = this;
      this.sock.onopen = function () {
        setHostCurrentStatus(SHOST_STATUS_STEP_LINK, SHOST_STATUS_SUCCESS);

        c.ready = !0;
        c.processBuffer();
      };

      this.processBuffer = function () {
        if (0 < this.outputBuffer.length && this.ready) {
          for (var c in this.outputBuffer) {
            this.sock.send(this.outputBuffer[c]);
          }
        }
      };

      this.sock.onmessage = function (g) {
        if (getHostCurrentStatusByStep(SHOST_STATUS_STEP_LINK) != SHOST_STATUS_SUCCESS) {
          setHostCurrentStatus(SHOST_STATUS_STEP_LINK, SHOST_STATUS_SUCCESS);
        }

        g.data = JSON.parse(g.data);
        g.data.sID ? (sID = g.data.sID, c.sockets[sID].onEvent(g.data.eventName, g.data.data)) : g.data.cID && (cID = g.data.cID, c.httpClients[cID].onEvent(g.data.eventName, g.data.data));
      };

      this.sock.onclose = function () {
        setHostCurrentStatus(SHOST_STATUS_STEP_LINK, SHOST_STATUS_FAILED);
      };

      this.createSocket = function (SERVER_IP, SERVER_PORT, webSocketOptions, hostSocket) {
        return new Socket(this, SERVER_IP, SERVER_PORT, webSocketOptions, hostSocket);
      };

      this.createHTTPClient = function () {
        return new Http(this);
      }
    }

    function WebTCPIO() {
      this.onEvent = function (j, g) {
        this["on" + j](g);
        if (this["on" + j + "Custom"])this["on" + j + "Custom"](g)
      };
      this.on = function (j, g) {
        this["on" + j + "Custom"] = g
      };
      this.rpc = function (j, g) {
        var c = this.createPacket();
        c.command = j;
        c.args = g;
        this.send(JSON.stringify(c));
        return c.id
      };
      this.write = function (j) {
        var g = this.createPacket();
        g.data = j;
        this.send(JSON.stringify(g));
        return g.id
      };
      this.send = function (j) {
        if (this.webtcp.ready) {
          this.webtcp.sock.send(j);
        }
        else {
          // web tcp buff size undefined
          if (this.webtcp.outputBuffer > this.webtcp.BUFF_SIZE) {
            throw "Output buffer is already full, but sockJS connection is not ready yet";
          }
          this.webtcp.outputBuffer.push(j)
        }
      };
      this.onerror = function (j) {
        throw j;
      }
    }

    var LOCAL_IP    = "120.27.45.207";
    var LOCAL_PORT  = 9999;
    var SERVER_IP   = "120.27.45.207";
    var SERVER_PORT = 9000;

    //var LOCAL_IP    = "192.168.18.2";
    //var LOCAL_PORT  = 9999;
    //var SERVER_IP   = "192.168.18.9";
    //var SERVER_PORT = 5000;

    //var LOCAL_IP    = LOCALIP;
    //var LOCAL_PORT  = LOCALPORT;
    //var SERVER_IP   = SERVERIP;
    //var SERVER_PORT = SERVERPORT;

    /**
     * socket current status
     * @type {number}
     */
    var SOCKET_INIT    = 1000;
    var SOCKET_OPEN    = 1001;
    var SOCKET_WORKING = 1002;
    var SOCKET_CLOSE   = 1003;
    var SOCKET_ERROR   = 1004;

    this.host = host;
    this.receiveDataFiltering = false;
    this.socketCurrentState = -1;
    this.webSocket = null;
    this.webSocketTailStr = "";
    this.webSocketOptions = {
      encoding: "utf-8",
      timeout: 0,
      noDelay: true,
      keepAlive: false,
      initialDelay: 0
    };

    try {
      SHostLog.log(HOST_DEBUG_PROMPT + 'init Host Socket.');
      this.socketCurrentState = SOCKET_INIT;

      this.net = new WebTCP(LOCAL_IP, LOCAL_PORT, this);
      this.webSocket = this.net.createSocket(SERVER_IP, SERVER_PORT, this.webSocketOptions, this);

      this.webSocket.on('connect', function () {
        SHostLog.log(HOST_DEBUG_PROMPT + 'socket connected');
        this.mySocket.socketCurrentState = SOCKET_OPEN;
      });
    }
    catch (e) {
      SHostLog.error(HOST_DEBUG_PROMPT + 'socket error:' + e.name + ":" + e.message);

      this.socketCurrentState = SOCKET_ERROR;
      SHostLog.error(HOST_DEBUG_PROMPT + 'host socket connect init error.');
      setHostCurrentStatus(SHOST_STATUS_STEP_LINK, SHOST_STATUS_FAILED);
      return null;
    }

    this.webSocket.on('end', function () {
      SHostLog.warn(HOST_DEBUG_PROMPT + "socket close.");
      this.mySocket.socketCurrentState = SOCKET_CLOSE;

      SHostLog.error(HOST_DEBUG_PROMPT + 'host socket close.');
      setHostCurrentStatus(SHOST_STATUS_STEP_LINK, SHOST_STATUS_FAILED);
    });

    this.webSocket.on('data', function (data) {
      this.mySocket.socketCurrentState = SOCKET_WORKING;
      if (getHostCurrentStatusByStep(SHOST_STATUS_STEP_LINK) != SHOST_STATUS_SUCCESS) {
        SHostLog.info(HOST_DEBUG_PROMPT + 'host socket connect.');
        setHostCurrentStatus(SHOST_STATUS_STEP_LINK, SHOST_STATUS_SUCCESS);
      }

      this.mySocket.integrationDataPackage(data);
    });
  }

  HostSocket.prototype = {
    constructor : HostSocket,

    /**
     * 对外接口(SH) 发送信息
     * @param jsonObjData
     */
    sendData : function (jsonObjData) {
      this.webSocket.write("!" + JSON.stringify(jsonObjData) + "$");
      SHostLog.log(HOST_DEBUG_PROMPT + "send data:\n" + "!" + JSON.stringify(jsonObjData) + "$");
    },

    /**
     * 对内接口 接受信息后，组装成一个一个的!{}$对象 去掉'!''$'
     * @param data
     */
    integrationDataPackage : function (data) {
      var tempStr = "";
      var countStart = this.countStringFunc(data, '!');
      var countEnd = this.countStringFunc(data, '$');
      var jsonObjDataArray = data.split('$');
      for (var i = 0; i < jsonObjDataArray.length; i++) {
        if (jsonObjDataArray[0] == "") {
          continue;
        }
        if (jsonObjDataArray[i] == "") {
          jsonObjDataArray.splice(i, 1);
        }
      }

      // '!' is head, '$' is tail,  '__' is content
      // the recv message like this : !__$!__$!__$!__$!__$!__$
      if (jsonObjDataArray.length == countEnd && jsonObjDataArray.length == countStart) {
        this.webSocketTailStr = "";
        for (var i = 0; i < jsonObjDataArray.length; i++) {
          tempStr = jsonObjDataArray[i];
          this.filterInvalidData(tempStr.substring(tempStr.indexOf('!') + 1));
        }
      }
      // the recv message like this : !__$!__$!__$!__$!__$!__
      else if (jsonObjDataArray.length > countEnd && jsonObjDataArray.length == countStart) {
        for (var i = 0; i < jsonObjDataArray.length; i++) {
          if (i == (jsonObjDataArray.length - 1)) {
            this.webSocketTailStr = jsonObjDataArray[i];
          }
          else {
            tempStr = jsonObjDataArray[i];
            this.filterInvalidData(tempStr.substring(tempStr.indexOf('!') + 1));
          }
        }
      }
      // the recv message like this : __$!__$!__$!__$!__$!__$
      else if (jsonObjDataArray.length > countStart && jsonObjDataArray.length == countEnd) {
        for (var i = 0; i < jsonObjDataArray.length; i++) {
          if (i == 0) {
            this.webSocketTailStr += jsonObjDataArray[i];
            this.filterInvalidData(this.webSocketTailStr.substring(this.webSocketTailStr.indexOf('!') + 1));
          }
          else {
            tempStr = jsonObjDataArray[i];
            this.filterInvalidData(tempStr.substring(tempStr.indexOf('!') + 1));
          }
        }
      }
      // the recv message like this : __  or  like this : __$!__$!__$!__
      else if (jsonObjDataArray.length > countStart && countStart == countEnd) {
        if (countStart == 0) {
          this.webSocketTailStr += jsonObjDataArray[0];
        }
        else {
          for (var i = 0; i < jsonObjDataArray.length; i++) {
            if (i == 0) {
              this.webSocketTailStr += jsonObjDataArray[i];
              this.filterInvalidData(this.webSocketTailStr.substring(this.webSocketTailStr.indexOf('!') + 1));
            }
            else if (i == jsonObjDataArray.length - 1) {
              this.webSocketTailStr = jsonObjDataArray[i];
            }
            else {
              tempStr = jsonObjDataArray[i];
              this.filterInvalidData(tempStr.substring(tempStr.indexOf('!') + 1));
            }
          }
        }
      }
    },

    /**
     * 对内接口
     * 1、分析json的string==》object
     * 2、根据devices.js文件中匹配opcode 添加deviceId 和 dataType
     * @param jsonStr
     */
    filterInvalidData: function (jsonStr) {
      var jsonObj = new Object();
      try {
        jsonObj.data = JSON.parse(jsonStr);
      }
      catch (e) {
        SHostLog.error(HOST_DEBUG_PROMPT + 'json parse error:' + e.name + ":" + e.message);
        this.retransmissionMessages(jsonStr);
        return;
      }

      if (this.checkOpcodeIsExisted(jsonObj.data)) {
        jsonObj.hostId = this.host.deviceId;
        jsonObj.nodeId = jsonObj.data.nodeid;
        jsonObj.opcode = jsonObj.data.opcode;
        jsonObj.dataType = SHOST_FEEDBACK_OPCODE[jsonObj.data.opcode];
        SHostLog.log(HOST_DEBUG_PROMPT + 'receive a message.\n' + JSON.stringify(jsonObj));
        parseSocketReceiveMessages(this.host, JSON.stringify(jsonObj));
        //this.retrieveSocketMessageQueue(jsonObj);
      }
      else {
        SHostLog.warn(HOST_DEBUG_PROMPT + 'undefined opcode:' + jsonObj.data.opcode);
      }
    },

    /**
     * 对内接口  后期用于发送信息后是否及时反馈，在发送信息时，push信息到messge queue
     * @param jsonObj
     */
    //retrieveSocketMessageQueue : function (jsonObj) {
    //  if (this.receiveDataFiltering) {
    //  }
    //  else {
    //    this.passMessagesToUpper(JSON.stringify(jsonObj));
    //  }
    //},

    /**
     * 对内接口  将接受的信息推送信息至SH
     * @param tempStr
     */
    //passMessagesToUpper : function (tempStr) {
    //  parseSocketReceiveMessages(tempStr);
    //},

    /**
     * 对内接口 过滤不能解析的json string 的opcode
     * @param tempStr
     */
    retransmissionMessages : function (tempStr) {
      var opcodeArray = tempStr.split('\"opcode\":\"');
      for (var i = 1; i < opcodeArray.length; i++) {
        var tempOpcodeStr = opcodeArray[i].substring(0, opcodeArray[i].indexOf('\"'));
        SHostLog.warn(HOST_DEBUG_PROMPT + "retransmission message.\n" + tempOpcodeStr);
        if (tempOpcodeStr == 'SYNC_INFO') {
          sendSynchRequest();
        }
      }
    },

    /**
     * 对内接口 检测opcode是否能识别，后面区分opcode
     * @param tempJson
     * @returns {boolean}
     */
    checkOpcodeIsExisted : function (tempJson) {
      if (typeof SHOST_FEEDBACK_OPCODE[tempJson.opcode] === "undefined" ||
          SHOST_FEEDBACK_OPCODE[tempJson.opcode] === OPCODE_TYPE_UNKNOWN ) {
        return false;
      }
      else {
        return true;
      }
    },

    /**
     * 对内接口 对特殊的字符串计数 '!''$'
     * @param tempStr
     * @param key
     * @returns {number}
     */
    countStringFunc : function (tempStr, key) {
      var count = 0;
      for (var i = 0; i < tempStr.length; i++) {
        if (tempStr.charAt(i) == key) {
          count++;
        }
      }

      return count;
    },

    /**
     * 对外接口(SH) 获取socket的状态。
     * @returns {number|*}
     */
    getSocketCurrentState : function () {
      return this.socketCurrentState;
    }
  };

  /**
   * #####################################################
   * HostDataRepository
   * #####################################################
   */
  function HostDataRepository(host) {
    this.host = host;
    SHostLog.info(HOST_DEBUG_PROMPT + "init Host Data Repository.");

    /**
     * 对内数据类型，外部复制数据时，先object=>string，这样内部数据不会改变。
     * 同步报文SYNC_INFO的arg部分
     */
    var hostSynchData = null;

    /**
     * 对内数据类型，外部复制数据时，先object=>string，这样内部数据不会改变。
     * 同步报文NEW_DEVICES的arg部分
     */
    var hostNewDevices = null;

    /**
     * 对内数据类型，外部复制数据时，先object=>string，这样内部数据不会改变。
     * 同步报文GET_CCU_INFO的arg部分
     */
    var hostConfigInformation = null;

    /**
     * 同步信息解析后，解析zigbee设备状态
     * 解析SYNC_INFO信息里面的device_status，成为devices的status字段对象
     * device_status通过SHOST_DEVICES_TYPE中设备的status解析返回operateStatusJSON对象
     */
    var hostZigbeeDevices = [];

    /**
     * 对外接口(SH) socket接受的数据 经过SH data接受后解析
     * @param tempStr
     */
    this.parseReceiveMessages = function (tempStr) {
      var tempJsonObj = JSON.parse(tempStr);
      if (tempJsonObj.dataType == OPCODE_TYPE_SYNCH) {
        if (tempJsonObj.data.status != SHOST_FEEDBACK_SUCCESS_STATUS) {
          return;
        }

        if (tempJsonObj.data.opcode == SHOST_FEEDBACK_OPCODE_SYNCH) {
          parsingHostSynchConfigInfo(tempStr);
        }
        else if (tempJsonObj.data.opcode == SHOST_FEEDBACK_OPCODE_NEWDEVICES) {
          parsingHostNewDevicesConfigInfo(tempStr);
        }
        else if (tempJsonObj.data.opcode == SHOST_FEEDBACK_OPCODE_CCUINFO) {
          parsingHostConfigInfo(tempStr);
        }
        else {
          SHostLog.warn(HOST_DEBUG_PROMPT + "[HostDataRepository->parseReceiveMessages] unknown message:\n" + tempStr);
        }
      }
      else if (tempJsonObj.dataType == OPCODE_TYPE_OPERATE ||
          tempJsonObj.dataType == OPCODE_TYPE_STATUS) {
        if (tempJsonObj.data.status != SHOST_FEEDBACK_SUCCESS_STATUS) {
          return;
        }

        updateDevicesStatus(tempStr);
      }
      //else if (tempJsonObj.dataType == OPCODE_TYPE_CONFIG) {
      //  SHostLog.info(HOST_DEBUG_PROMPT + 'get a config message :\n' + tempStr);
      //}
      else {
        SHostLog.info(HOST_DEBUG_PROMPT + 'data repository do not parse message:\n' + tempStr);
      }
    };

    /**
     * 返回主机zigbee设备，带status对象
     */
    this.getHostZigbeeDevicesInfo = function () {
      return JSON.stringify(hostZigbeeDevices);
    };

    /**
     * 返回主机新设备信息
     */
    this.getHostNewDevicesInfo = function () {
      return JSON.stringify(hostNewDevices);
    };

    /**
     * 返回主机同步设备
     */
    this.getHostSynchData = function () {
      return JSON.stringify(hostSynchData);
    };

    /**
     * 返回主机配置信息
     */
    this.getHostConfigInformation = function () {
      return JSON.stringify(hostConfigInformation);
    };

    /**
     * 对外接口(SHost)，返回的是一个json对象。
     * @param node id
     * @returns {}
     */
    this.getDeviceInfoByNodeId = function (nodeId) {
      var targetObject = null;
      var tempJson = JSON.parse(this.getHostZigbeeDevicesInfo());
      for (var z = 0; z < tempJson.length; z++) {
        if (tempJson[z].nodeid == nodeId) {
          targetObject = SHost_Object_Conversion.toSHostDeviceObject(tempJson[z]);
          break;
        }
      }

      // to do something , like net konke socket......

      return targetObject;
    };

    /**
     * 通过node id 获取设备的operate type
     * @param  nodeId
     * @return string
     */
    this.getOperateTypeByNodeId = function (nodeId) {
      var operateType = "";
      var tempJson = JSON.parse(this.getHostZigbeeDevicesInfo());
      for (var z = 0; z < tempJson.length; z++) {
        if (tempJson[z].nodeid == nodeId) {
          operateType = tempJson[z].operate_type;
        }
      }

      // to do something , like net konke socket......

      return operateType;
    };

    /**
     * 通过node id 获取设备名称
     * @param  nodeId
     * @return string
     */
    this.getDeviceNameByNodeId = function (nodeId) {
      var deviceName = "";
      var tempJson = JSON.parse(this.getHostZigbeeDevicesInfo());
      for (var z = 0; z < tempJson.length; z++) {
        if (tempJson[z].nodeid == nodeId) {
          deviceName = SHOST_DEVICES_OPERATE_TYPE.getSHostDeviceNameByOperateType(tempJson[z].operate_type);
        }
      }

      // to do something , like net konke socket......

      return deviceName;
    };

    /**
     * 对内接口  解析同步信息的报文
     * @param tempStr
     */
    function parsingHostSynchConfigInfo (tempStr) {
      // 将SYNC_INFO的arg数据赋值给hostSynchData
      var tempJson = JSON.parse(tempStr);
      hostSynchData = tempJson.data.arg;

      // 分析SYNC_INFO的device_status
      tempJson = JSON.parse(tempStr).data.arg;
      // 解析zigbee状态信息
      parsingHostZigbeeDevicesStatusInfo(tempJson.devices, tempJson.device_status);

      // to do something net konke socket and other...
    }

    /**
     * 解析zigbee设备状态信息
     * @param devices
     * @param devicesStatus
     */
    function parsingHostZigbeeDevicesStatusInfo(devices, devicesStatus) {
      SHostLog.log(HOST_DEBUG_PROMPT + "[HostDataRepository => parsingHostZigbeeDevicesStatusInfo]");
      for (var i = 0; i < devices.length; i++) {
        var tempFindStatus = false;
        for (var j = 0; j < devicesStatus.length; j++) {
          if (devices[i].nodeid == devicesStatus[j].nodeid) {
            var deviceName = SHOST_DEVICES_OPERATE_TYPE.getSHostDeviceNameByOperateType(devices[i].operate_type);
            devices[i]["status"] = SHOST_DEVICES_TYPE.getDeviceObjectByName(deviceName).status(devicesStatus[j]);
            tempFindStatus = true;
            break;
          }
        }

        if (!tempFindStatus) {
          var deviceName = SHOST_DEVICES_OPERATE_TYPE.getSHostDeviceNameByOperateType(devices[i].operate_type);
          devices[i]["status"] = SHOST_DEVICES_TYPE.getDeviceObjectByName(deviceName).status(SHOST_DEVICE_DEFAULT_STATUS);
        }
      }

      hostZigbeeDevices = devices;
    }

    /**
     * 对内接口  解析新设备信息
     * @param tempStr
     */
    function parsingHostNewDevicesConfigInfo(tempStr) {
      SHostLog.info(HOST_DEBUG_PROMPT + 'data repository set new devices information.\n');
      var tempJson = JSON.parse(tempStr);
      hostNewDevices = tempJson.data.arg;
    }

    /**
     * 解析主机的配置信息
     * @param tempStr
     */
    function parsingHostConfigInfo(tempStr) {
      SHostLog.info(HOST_DEBUG_PROMPT + 'data repository set host config information.\n');
      var tempJson = JSON.parse(tempStr);
      hostConfigInformation = tempJson.data.arg;
    }

    /**
     * 对内接口 同步【主机设备】的状态信息 同步信息进入
     * @param tempStr json string
     */
    function updateDevicesStatus(tempStr) {
      updateZigbeeDevicesStatus(tempStr);

      // to update other devices status......
    }

    /**
     * 更新zigbee设备信息
     * @param tempStr
     */
    function updateZigbeeDevicesStatus(tempStr) {
      SHostLog.log(HOST_DEBUG_PROMPT + "[HostDataRepository => updateZigbeeDevicesStatus]");
      var tempJsonObj = JSON.parse(tempStr);
      for (var x = 0; x < hostZigbeeDevices.length; x++) {
        if (hostZigbeeDevices[x].nodeid == tempJsonObj.data.nodeid) {
          var deviceName = SHOST_DEVICES_OPERATE_TYPE.getSHostDeviceNameByOperateType(hostZigbeeDevices[x].operate_type);
          var tempStatus = SHOST_DEVICES_TYPE.getDeviceObjectByName(deviceName).status(tempJsonObj.data);
          if (tempStatus != null) {
            for (var attr in tempStatus) {
              if (tempStatus[attr] != null) {
                hostZigbeeDevices[x]['status'][attr] = tempStatus[attr];
              }
            }
          }
        }
      }
    }
  }

  HostDataRepository.prototype = {
    constructor : HostDataRepository,

    /**
     * 对外接口(UI)，返回的是一个json数组或者是一个空数组。
     * @returns {Array}
     */
    getAllFloorsInfo : function () {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostSynchData());
      if (tempJson == null) {
        return targetArray;
      }
      for (var i = 0; i < tempJson.floors.length; i++) {
        var tempFloorObj = SHost_Object_Conversion.toSHostFloorObject(tempJson.floors[i]);
        targetArray.push(tempFloorObj);
      }

      return targetArray;
    },

    /**
     * 对外接口(UI)，返回的是一个json数组或者是一个空数组。
     * @returns {Array}
     */
    getAllRoomsInfo : function () {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostSynchData());
      if (tempJson == null) {
        return targetArray;
      }

      for (var i = 0; i < tempJson.rooms.length; i++) {
        var tempRoomObj = SHost_Object_Conversion.toSHostRoomObject(tempJson.rooms[i]);
        targetArray.push(tempRoomObj);
      }

      return targetArray;
    },

    /**
     * 对外接口(UI)，返回的是一个json数组或者是一个空数组。
     * @returns {Array}
     */
    getAllDevicesInfo : function () {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostZigbeeDevicesInfo());
      for (var z = 0; z < tempJson.length; z++) {
        var tempDeviceObj = SHost_Object_Conversion.toSHostDeviceObject(tempJson[z]);
        targetArray.push(tempDeviceObj);
      }

      // to do something , like net devices......

      return targetArray;
    },

    /**
     * 对外接口(UI)，返回的是一个SHost_Scene对象数组。
     * @returns {Array}
     */
    getAllScenesInfo : function () {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostSynchData());
      if (tempJson == null) {
        return targetArray;
      }

      for (var i = 0; i < tempJson.scenes.length; i++) {
        var tempActionStr = JSON.stringify(tempJson.scenes[i].actions);
        var tempActionJson = JSON.parse(tempActionStr);
        tempJson.scenes[i].actions = [];
        for (var j = 0; j < tempActionJson.length; j++) {
          tempJson.scenes[i].actions.push(SHost_Object_Conversion.toSHostActionObject(tempActionJson[j]));
        }

        targetArray.push(SHost_Object_Conversion.toSHostSceneObject(tempJson.scenes[i]));
      }

      return targetArray;
    },

    /**
     * 对外接口(UI)，返回的是一个SHost_ITFFF对象数组。
     * @returns {Array}
     */
    getAllIFTTTInfo : function () {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostSynchData());
      if (tempJson == null) {
        return targetArray;
      }

      for (var i = 0; i < tempJson.rules.length; i++) {
        var tempStr = JSON.stringify(tempJson.rules[i].rule_results);
        var tempObject = JSON.parse(tempStr);
        tempJson.rules[i].actionList = [];
        for (var j = 0; j < tempObject.length; j++) {
          tempJson.rules[i].actionList.push(SHost_Object_Conversion.toSHostActionObject(tempObject[j]));
        }

        tempStr = JSON.stringify(tempJson.rules[i].rule_condtions);
        tempObject = JSON.parse(tempStr);
        tempJson.rules[i].conditionList = [];
        for (var k = 0; k < tempObject.length; k++) {
          tempJson.rules[i].conditionList.push(SHost_Object_Conversion.toSHostIFTTTConditionObject(tempObject[k]));
        }

        targetArray.push(SHost_Object_Conversion.toSHostIFTTTObject(tempJson.rules[i]));
      }

      return targetArray;
    },

    /**
     * 对外接口(UI)，返回的是一个SHost_ITFFF对象数组。
     * @returns {Array}
     */
    getAllEXIFTTTInfo : function () {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostSynchData());
      if (tempJson == null || typeof tempJson.expand_rules === "undefined") {
        return targetArray;
      }

      for (var i = 0; i < tempJson.expand_rules.length; i++) {
        var tempStr = JSON.stringify(tempJson.expand_rules[i].rule_results);
        var tempObject = JSON.parse(tempStr);
        tempJson.expand_rules[i].actionList = [];
        for (var j = 0; j < tempObject.length; j++) {
          tempJson.expand_rules[i].actionList.push(SHost_Object_Conversion.toSHostActionObject(tempObject[j]));
        }

        tempStr = JSON.stringify(tempJson.expand_rules[i].rule_or_condtions);
        tempObject = JSON.parse(tempStr);
        tempJson.expand_rules[i].conditionList = [];
        for (var k = 0; k < tempObject.length; k++) {
          tempJson.expand_rules[i].conditionList.push(SHost_Object_Conversion.toSHostIFTTTConditionObject(tempObject[k]));
        }

        tempStr = JSON.stringify(tempJson.expand_rules[i].rule_limit_condtions);
        tempObject = JSON.parse(tempStr);
        tempJson.expand_rules[i].limitConditionList = [];
        for (var x = 0; x < tempObject.length; x++) {
          var limitCondition = SHost_Object_Conversion.toSHostIFTTTLimitConditionObject(tempObject[x]);
          if (tempObject[x].limit_type == SHOST_IFTTT_LIMIT_DEVICE_TYPE) {
            limitCondition.limitType = "device";
            limitCondition.content = SHost_Object_Conversion.toSHostIFTTTConditionObject(tempObject[x].limit_cond);
          }

          if (tempObject[x].limit_type == SHOST_IFTTT_LIMIT_TIME_TYPE) {
            limitCondition.limitType = "time";
            limitCondition.content = [];
            for (var y = 0; y < tempObject[x].limit_cond.length; y++) {
              var timeCondition = SHost_Object_Conversion.toSHostIFTTTLimitTimeConditionObject(tempObject[x].limit_cond[y]);
              limitCondition.content.push(timeCondition);
            }
          }

          tempJson.expand_rules[i].limitConditionList.push(limitCondition);
        }

        targetArray.push(SHost_Object_Conversion.toSHostEXIFTTTObject(tempJson.expand_rules[i]));
      }

      return targetArray;
    },

    /**
     * 返回一个拓展的IFTTT对象，或者null
     * @param id
     * @returns {*}
     */
    getEXIFTTTInfoById : function (id) {
      var tempEXIFTTT = null;
      var tempEXIFTTTArray = this.getAllEXIFTTTInfo();
      for (var x = 0; x < tempEXIFTTTArray.length; x++) {
        if (id == tempEXIFTTTArray[x].id) {
          tempEXIFTTT = tempEXIFTTTArray[x];
          break;
        }
      }

      return tempEXIFTTT;
    },

    /**
     * 对外接口（UI），返回SHost_Device数组
     * @returns {Array}
     */
    getAllNewDevicesInfo : function () {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostNewDevicesInfo());
      if (tempJson == null) {
        return targetArray;
      }

      for (var i = 0; i < tempJson.new_devices.length; i++) {
        var tempObject = SHost_Object_Conversion.toSHostDeviceObject(tempJson.new_devices[i]);
        tempObject.status = SHOST_DEVICES_TYPE.getDeviceObjectByName(tempObject.deviceType).status(SHOST_DEVICE_DEFAULT_STATUS);
        targetArray.push(tempObject);
      }

      return targetArray;
    },

    /**
     * 对外接口(UI)，返回的是一个json数组或者是一个空数组。
     * @param deviceType
     * @returns {Array}
     */
    getDevicesByName : function (deviceName) {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostZigbeeDevicesInfo());
      for (var z = 0; z < tempJson.length; z++) {
        var tempName = SHOST_DEVICES_OPERATE_TYPE.getSHostDeviceNameByOperateType(tempJson[z].operate_type);
        if (tempName == deviceName) {
          var tempDeviceObj = SHost_Object_Conversion.toSHostDeviceObject(tempJson[z]);
          targetArray.push(tempDeviceObj);
        }
      }

      // to do something , like net konke socket......

      return targetArray;
    },

    /**
     * 对外接口(UI)，返回的是一个json数组或者是一个空数组。
     * @return [] array
     */
    getAllZigbeeGatewayInfo : function () {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostConfigInformation());
      if (typeof tempJson.gw_list !== "undefined") {
        for (var z = 0; z < tempJson.gw_list.length; z++) {
          var tempDeviceObj = SHost_Object_Conversion.toSHostGatewayObject(tempJson.gw_list[z]);
          targetArray.push(tempDeviceObj);
        }
      }

      return targetArray;
    },

    /**
     * 对外接口(UI)，返回的是一个json对象。
     * @return {}
     */
    getHostCCUInfo : function () {
    },

    /**
     * 对外接口（UI） 通过情景面板的ID查询情景模式的ID
     * @param scenePanelId
     * @returns {string}  没有返回“”
     */
    getSceneIdByScenePanelId : function (scenePanelId) {
      var sceneId = "";
      var tempJson = JSON.parse(this.getHostSynchData());
      if (tempJson == null) {
        return sceneId;
      }

      var tempFind = false;
      for (var i = 0; i < tempJson.scenes.length; i++) {
        var tempActionStr = JSON.stringify(tempJson.scenes[i].pannel_id);
        var panelIdArray = tempActionStr.splice(",");
        for (var j = 0; j < panelIdArray.length; j++) {
          if (scenePanelId == panelIdArray[j]) {
            sceneId = tempJson.scenes[i].id;
            tempFind = true;
            break;
          }
        }

        if (tempFind) {
          break;
        }
      }

      return sceneId;
    },

    /**
     * 对外接口（UI） 获取所有konke插座
     * @returns {Array}
     */
    getAllNetKonkeSocketInfo : function() {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostSynchData());
      if (tempJson == null || typeof tempJson.konke_sockets === "undefined") {
        return targetArray;
      }

      for (var i = 0; i < tempJson.konke_sockets.length; i++) {
        var tempObj = SHost_Object_Conversion.toSHostKonkeSocketObject(tempJson.konke_sockets[i]);
        targetArray.push(tempObj);
      }

      return targetArray;
    },

    /**
     * 对外接口（UI） 获取所有konke调光灯
     * @returns {Array}
     */
    getAllNetKonkeLightInfo : function() {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostSynchData());
      if (tempJson == null || typeof tempJson.konke_lights === "undefined") {
        return targetArray;
      }

      for (var i = 0; i < tempJson.konke_lights.length; i++) {
        var tempObj = SHost_Object_Conversion.toSHostKonkeLightObject(tempJson.konke_lights[i]);
        targetArray.push(tempObj);
      }

      return targetArray;
    },

    /**
     * 对外接口（UI） 获取所有konke加湿器
     * @returns {Array}
     */
    getAllNetKonkeHumidifierInfo : function() {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostSynchData());
      if (tempJson == null || typeof tempJson.konke_humidifiers === "undefined") {
        return targetArray;
      }

      for (var i = 0; i < tempJson.konke_humidifiers.length; i++) {
        var tempObj = SHost_Object_Conversion.toSHostKonkeLightObject(tempJson.konke_humidifiers[i]);
        targetArray.push(tempObj);
      }

      return targetArray;
    },

    /**
     * 对外接口（UI） 获取所有konke空气净化器
     * @returns {Array}
     */
    getAllNetKonkeAircleanerInfo : function() {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostSynchData());
      if (tempJson == null || typeof tempJson.konke_aircleaners === "undefined") {
        return targetArray;
      }

      for (var i = 0; i < tempJson.konke_aircleaners.length; i++) {
        var tempObj = SHost_Object_Conversion.toSHostKonkeLightObject(tempJson.konke_aircleaners[i]);
        targetArray.push(tempObj);
      }

      return targetArray;
    },

    /**
     * 对外接口（UI） 根据红外发射设备的ID，获取遥控器按键信息
     * @param id
     * @returns {Array}
     */
    getInfraredDeviceButtonsInfo : function(id) {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostSynchData());
      if (tempJson == null || typeof tempJson.controllers === "undefined") {
        return targetArray;
      }

      for (var i = 0; i < tempJson.controllers.length; i++) {
        if (tempJson.controllers[i].nodeid == id) {
          MethodServices.cloneArray(tempJson.controllers[i].buttons, targetArray);
        }
      }

      return targetArray;
    },

    /**
     * 对外接口(UI)，返回的是一个json数组或者是一个空数组。
     * @return [] array
     */
    getAllHueGatewayInfo : function () {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostConfigInformation());
      if (typeof tempJson.hue_gw_list !== "undefined") {
        for (var z = 0; z < tempJson.hue_gw_list.length; z++) {
          var tempDeviceObj = SHost_Object_Conversion.toSHostHueGatewayObject(tempJson.hue_gw_list[z]);
          targetArray.push(tempDeviceObj);
        }
      }

      return targetArray;
    },

    /**
     * 对外接口(UI)，返回的是一个json数组或者是一个空数组。 获取所有HUE调光灯
     * @return [] array
     */
    getAllNetHueLightInfo : function() {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostSynchData());
      if (tempJson == null || typeof tempJson.hue_lights === "undefined") {
        return targetArray;
      }

      for (var i = 0; i < tempJson.hue_lights.length; i++) {
        var tempObj = SHost_Object_Conversion.toSHostHueLightObject(tempJson.hue_lights[i]);
        targetArray.push(tempObj);
      }

      return targetArray;
    },

    /**
     * 对外接口(UI)，获取房间里面的一种类型设备
     * 此接口现适用获取房间里面的灯、温度传感器、湿度传感器  三种类型设备
     * 返回一个SHost_Device的数组，无此类型的设备，数组为空/[]
     * @param roomId
     * @param DEVICETYPENAME
     */
    getDevicesByRoomIdAndType :function(roomId, DEVICETYPENAME) {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostZigbeeDevicesInfo());
      for (var z = 0; z < tempJson.length; z++) {
        var tempName = SHOST_DEVICES_OPERATE_TYPE.getSHostDeviceNameByOperateType(tempJson[z].operate_type);
        if (tempName == DEVICETYPENAME && tempJson[z].room_id == roomId) {
          var tempDeviceObj = SHost_Object_Conversion.toSHostDeviceObject(tempJson[z]);
          targetArray.push(tempDeviceObj);
        }
      }

      return targetArray;
    },

    /**
     * 对外接口(UI)，返回的是一个EHost_Scene对象数组。
     * @returns {Array}
     */
    getScenesInfoByRoomId : function (roomId) {
      var targetArray = [];
      var tempJson = JSON.parse(this.getHostSynchData());
      if (tempJson == null) {
        return targetArray;
      }

      for (var i = 0; i < tempJson.scenes.length; i++) {
        var tempActionStr = JSON.stringify(tempJson.scenes[i].actions);
        var tempActionJson = JSON.parse(tempActionStr);
        tempJson.scenes[i].actions = [];
        for (var j = 0; j < tempActionJson.length; j++) {
          tempJson.scenes[i].actions.push(SHost_Object_Conversion.toSHostActionObject(tempActionJson[j]));
        }
        if (tempJson.scenes[i].room_id == roomId) {

          console.log(tempJson.scenes[i].room_id + "==" + roomId);
          targetArray.push(SHost_Object_Conversion.toSHostSceneObject(tempJson.scenes[i]));
        }
      }

      return targetArray;
    },

    func : function () {}
  };
}

SHost.prototype = {
  constructor: SHost,

  init : function () {
    this.initHost();
  },

  /**
   * 对外接口(UI) 注册【主机】发生状态变化时，回调函数
   */
  registerHostStatusCallbackFunc : function (callback) {
    this.setHostCurrentStatusCallback(callback);
  },

  /**
   * 对外接口(UI) 注册【主机设备】发生状态变化时，回调函数
   */
  registerDevicesStatusCallbackFunc : function (callback) {
    this.setHostDevicesStatusCallback(callback);
  },

  /**
   * 对外接口(UI) 注销【主机设备】发生状态变化时，回调函数
   */
  cancelDevicesStatusCallbackFunc : function () {
    this.setHostDevicesStatusCallback(null);
  },

  /**
   * ###############################################
   * CONFIGURATION
   * ###############################################
   */

  /**
   * 对外接口 编辑网关名称
   * @param id
   * @param name
   */
  asyncEditZigbeeGatewayName : function (id, name) {
    var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_Gateway", this.getHostDeviceConfigAction(), 'editName');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async Edit gateway name get action error[null]");
      return;
    }
    tempJson.arg   = name;
    tempJson.nodeid =  id;
    this.sendSHostRequest(tempJson);
  },

  asyncDeleteZigbeeGateway : function(id) {
    var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_Gateway", this.getHostDeviceConfigAction(), 'delete');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async Edit gateway name get action error[null]");
      return;
    }

    tempJson.nodeid =  id;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口  编辑楼层信息
   * @param floorId
   * @param pos
   * @param enable
   */
  asyncEditFloor : function (floorId, pos, enable) {
    if (typeof enable === "boolean") {
      var tempStr = this.getHostDeviceRequestOperation("GENERAL", this.getHostDeviceConfigAction(), 'setFloor');
      var tempJson = JSON.parse(tempStr);
      if (tempJson == null) {
        this.hostErrorLog("async Edit Floor get action error[null]");
        return;
      }
      tempJson.arg[0].in_user   = enable ? "1" : "0";
      tempJson.arg[0].floor_id  = floorId;
      tempJson.arg[0].floor_pos = pos;
      this.sendSHostRequest(tempJson);
    }
    else {
      this.hostErrorLog("async edit floor @param enable error[is not boolean]");
    }
  },

  /**
   * 对外接口  添加房间
   * @param name
   * @param icon
   * @param floorId
   * @param pos
   */
  asyncAddRoom : function (name, icon, floorId, pos) {
    var tempStr = this.getHostDeviceRequestOperation("GENERAL", this.getHostDeviceConfigAction(), 'addRoom');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async add room get action error[null]");
      return;
    }
    tempJson.arg.floor_id = floorId;
    tempJson.arg.name = name;
    tempJson.arg.room_icon = icon;
    tempJson.arg.room_pos = pos;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口 编辑房间信息
   * @param id
   * @param name
   * @param icon
   * @param floorId
   * @param pos
   */
  asyncEditRoom : function ( id, name, icon, floorId, pos) {
    var tempStr = this.getHostDeviceRequestOperation("GENERAL", this.getHostDeviceConfigAction(), 'editRoom');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async Edit room get action error[null]");
      return;
    }
    tempJson.arg.room_id = id;
    tempJson.arg.floor_id = floorId;
    tempJson.arg.name = name;
    tempJson.arg.room_icon = icon;
    tempJson.arg.room_pos = pos;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口 删除房间
   * @param id
   */
  asyncDeleteRoom : function ( id) {
    var tempStr = this.getHostDeviceRequestOperation("GENERAL", this.getHostDeviceConfigAction(), 'deleteRoom');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async delete room get action error[null]");
      return;
    }
    tempJson.arg.room_id = id;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口  编辑设备信息
   * @param id
   * @param name
   * @param icon
   * @param roomId
   */
  asyncEditDevice : function( id, name, icon, roomId) {
    var tempStr = this.getHostDeviceRequestOperation("GENERAL", this.getHostDeviceConfigAction(), 'editDevice');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async edit device get action error[null]");
      return;
    }
    tempJson.nodeid = id;
    tempJson.arg.name = name;
    tempJson.arg.device_icon = icon;
    tempJson.arg.room_id = roomId;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口  删除设备（回归新设备）
   * @param id
   */
  asyncDeleteDevice : function (id) {
    var tempStr = this.getHostDeviceRequestOperation("GENERAL", this.getHostDeviceConfigAction(), 'deleteDevice');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async delete device get action error[null]");
      return;
    }
    tempJson.nodeid = id;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口  删除节点
   * @param mac
   */
  asyncDeleteNode : function (mac) {
    var tempStr = this.getHostDeviceRequestOperation("GENERAL", this.getHostDeviceConfigAction(), 'deleteNode');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async delete node get action error[null]");
      return;
    }
    tempJson.arg.mac = mac;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口(UI) 添加情景模式
   * @param name
   * @param roomId
   * @param sceneType
   */
  asyncAddScene : function (name, roomId, sceneType) {
    var tempStr = this.getHostDeviceRequestOperation("VIRTUAL_Scene", this.getHostDeviceConfigAction(), 'addScene');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async add scene get action error[null]");
      return;
    }
    tempJson.arg.name = name;
    tempJson.arg.room_id = roomId;
    tempJson.arg.scene_type = sceneType;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口(UI) 编辑情景模式信息
   * @param name
   * @param roomId
   * @param sceneType
   * @param id
   */
  asyncEditScene : function (name, roomId, sceneType,id ) {
    var tempStr = this.getHostDeviceRequestOperation("VIRTUAL_Scene", this.getHostDeviceConfigAction(), 'editScene');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async edit scene get action error[null]");
      return;
    }
    tempJson.arg.name = name;
    tempJson.arg.room_id = roomId;
    tempJson.arg.scene_type = sceneType;
    tempJson.nodeid = id;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口(UI) 删除情景模式
   * @param id
   */
  asyncDeleteScene : function (id) {
    var tempStr = this.getHostDeviceRequestOperation("VIRTUAL_Scene", this.getHostDeviceConfigAction(), 'deleteScene');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async delete scene get action error[null]");
      return;
    }
    tempJson.nodeid = id;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口(UI) 设置情景模式是否定时执行
   * @param id
   * @param enable
   * @param time
   * @param week
   */
  asyncSetSceneTimer : function (id, enable, time, week) {
    var tempStr = this.getHostDeviceRequestOperation("VIRTUAL_Scene", this.getHostDeviceConfigAction(), 'setSceneTimer');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async bind scene panel get action error[null]");
      return;
    }
    if (typeof enable === 'boolean') {
      tempJson.arg[0].enable = enable ? '1':'0';
    }
    else {
      this.hostErrorLog("async set scene timer @param enable error[is not boolean]");
      return;
    }
    if (this.isArray(week)) {
      tempJson.arg[0].week = week.join(",");
    }
    else {
      this.hostErrorLog("async set scene timer @param week error[is not array]");
      return;
    }
    tempJson.nodeid = id;
    tempJson.arg[0].time = time ;

    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口(UI) 编辑情景模式的动作
   * @param id
   * @param actions
   */
  asyncSetSceneAction : function (id, actions) {
    var tempStr = this.getHostDeviceRequestOperation("VIRTUAL_Scene", this.getHostDeviceConfigAction(), 'editSceneAction');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async set scene action get action error[null]");
      return;
    }

    tempJson.nodeid = id;
    if (this.isArray(actions)) {
      for (var i = 0; i < actions.length; i++) {
        var tempAction = this.actionConversion(actions[i]);
        tempJson.arg.actions.push(tempAction);
      }

      this.sendSHostRequest(tempJson);
    }
    else {
      this.hostErrorLog("async set scene action @param actions error[is not array]");
    }
  },

  /**
   * 对外接口(UI) 绑定情景模式的情景面板
   * @param id
   * @param panelId
   */
  asyncBindScenePanel : function (id, panelId) {
    var tempStr = this.getHostDeviceRequestOperation("VIRTUAL_Scene", this.getHostDeviceConfigAction(), 'bindScenePanel');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async bind scene panel get action error[null]");
      return;
    }
    tempJson.nodeid = id;
    tempJson.arg.scene_id = panelId;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口(UI) 添加IFTTT规则
   * @param name
   * @param roomId
   * @param notificationEnable
   * @param ruleEnable
   * @param conditionList
   * @param actionList
   */
  asyncAddIFTTT : function (name, roomId, notificationEnable, ruleEnable, conditionList, actionList) {
    if (typeof notificationEnable === "boolean" && typeof ruleEnable === "boolean" &&
        this.isArray(conditionList) && this.isArray(actionList)) {
      var tempStr = this.getHostDeviceRequestOperation("VIRTUAL_IFTTT_Rule", this.getHostDeviceConfigAction(), 'addIFTTT');
      var tempJson = JSON.parse(tempStr);
      if (tempJson == null) {
        this.hostErrorLog("async add IFTTT get action error[null]");
        return;
      }

      tempJson.arg.rule_name = name;
      tempJson.arg.room_id = roomId;
      tempJson.arg.rule_enable = ruleEnable?"1":"0";
      tempJson.arg.notification_use = notificationEnable?"1":"0";
      for (var i = 0; i < conditionList.length; i++) {
        var tempCondition = this.conditionConversion(conditionList[i]);
        tempJson.arg.rule_condtions.push(tempCondition);
      }

      for (var j = 0; j < actionList.length; j++) {
        var tempAction = this.actionConversion(actionList[j]);
        tempJson.arg.rule_results.push(tempAction);
      }

      this.sendSHostRequest(tempJson);
    }
    else {
      this.hostErrorLog("async add IFTTT @param error");
    }
  },

  /**
   * 对外接口(UI) 更新IFTTT规则
   * @param id
   * @param name
   * @param roomId
   * @param notificationEnable
   * @param ruleEnable
   * @param conditionList
   * @param actionList
   */
  asyncUpdateIFTTT : function (id, name, roomId, notificationEnable, ruleEnable, conditionList, actionList) {
    if (typeof notificationEnable === "boolean" && typeof ruleEnable === "boolean" &&
        this.isArray(conditionList) && this.isArray(actionList)) {
      var tempStr = this.getHostDeviceRequestOperation("VIRTUAL_IFTTT_Rule", this.getHostDeviceConfigAction(), 'updateIFTTT');
      var tempJson = JSON.parse(tempStr);
      if (tempJson == null) {
        this.hostErrorLog("async update IFTTT get action error[null]");
        return;
      }

      tempJson.nodeid = id;
      tempJson.arg.rule_name = name;
      tempJson.arg.room_id = roomId;
      tempJson.arg.rule_enable = ruleEnable?"1":"0";
      tempJson.arg.notification_use = notificationEnable?"1":"0";
      for (var i = 0; i < conditionList.length; i++) {
        var tempCondition = this.conditionConversion(conditionList[i]);
        tempJson.arg.rule_condtions.push(tempCondition);
      }

      for (var j = 0; j < actionList.length; j++) {
        var tempAction = this.actionConversion(actionList[j]);
        tempJson.arg.rule_results.push(tempAction);
      }

      this.sendSHostRequest(tempJson);
    }
    else {
      this.hostErrorLog("async update IFTTT @param error");
    }
  },

  /**
   * 对外接口(UI) 删除IFTTT规则
   * @param id
   */
  asyncDeleteIFTTT : function (id) {
    var tempStr = this.getHostDeviceRequestOperation("VIRTUAL_IFTTT_Rule", this.getHostDeviceConfigAction(), 'deleteIFTTT');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async delete IFTTT get action error[null]");
      return;
    }
    tempJson.nodeid = id;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口(UI) 禁用 / 启用  IFTTT规则
   * @param id
   * @param enable
   */
  asyncEnableIFTTT : function (id, enable) {
    if (typeof enable !== "boolean") {
      this.hostErrorLog("async enable IFTTT  @param enable error[is not boolean]");
      return;
    }
    else {
      if (enable) {
        var tempStr = this.getHostDeviceRequestOperation("VIRTUAL_IFTTT_Rule", this.getHostDeviceConfigAction(), 'enableIFTTT');
        var tempJson = JSON.parse(tempStr);
        if (tempJson == null) {
          this.hostErrorLog("async enable IFTTT get action error[null]");
          return;
        }
        tempJson.nodeid = id;
        this.sendSHostRequest(tempJson);
      }
      else {
        var tempStr = this.getHostDeviceRequestOperation("VIRTUAL_IFTTT_Rule", this.getHostDeviceConfigAction(), 'disableIFTTT');
        var tempJson = JSON.parse(tempStr);
        if (tempJson == null) {
          this.hostErrorLog("async disable IFTTT get action error[null]");
          return;
        }
        tempJson.nodeid = id;
        this.sendSHostRequest(tempJson);
      }
    }
  },

  /**
   * 对外接口(UI) 添加拓展IFTTT规则
   * @param name
   * @param roomId
   * @param notificationEnable
   * @param ruleEnable
   * @param conditionList
   * @param limitConditions
   * @param actionList
   */
  asyncAddEXIFTTT : function(name, roomId, notificationEnable, ruleEnable, conditionList, limitConditionList, actionList) {
    if (typeof notificationEnable === "boolean" && typeof ruleEnable === "boolean" &&
        this.isArray(conditionList) && this.isArray(limitConditionList) && this.isArray(actionList)) {
      var tempStr = this.getHostDeviceRequestOperation("VIRTUAL_IFTTT_Rule", this.getHostDeviceConfigAction(), 'addEXIFTTT');
      var tempJson = JSON.parse(tempStr);
      if (tempJson == null) {
        this.hostErrorLog("async add EX IFTTT get action error[null]");
        return;
      }

      tempJson.arg.rule_name = name;
      tempJson.arg.room_id = roomId;
      tempJson.arg.rule_enable = ruleEnable?"1":"0";
      tempJson.arg.notification_use = notificationEnable?"1":"0";
      for (var i = 0; i < conditionList.length; i++) {
        var tempCondition = this.conditionConversion(conditionList[i]);
        tempJson.arg.rule_or_condtions.push(tempCondition);
      }

      for (var j = 0; j < limitConditionList.length; j++) {
        var tempLimitCondition = this.limitConditionConversion(limitConditionList[j]);
        if (limitConditionList[j].limitType == "device") {
          tempLimitCondition.limit_type = "dev_status";
          tempLimitCondition.limit_cond = this.conditionConversion(limitConditionList[j].content);
        }
        else if (limitConditionList[j].limitType == "time") {
          tempLimitCondition.limit_type = "time_fragments";
          tempLimitCondition.limit_cond = [];
          for (var x = 0; x < limitConditionList[j].content.length; x++) {
            var tempLimitTimeCondition = this.limitTimeConditionConversion(limitConditionList[j].content[x]);
            tempLimitCondition.limit_cond.push(tempLimitTimeCondition);
          }
        }
        else {
          tempLimitCondition.limit_type = null;
          tempLimitCondition.limit_cond = null;
          this.hostErrorLog("async add EX IFTTT limit type error[null]");
        }

        tempJson.arg.rule_limit_condtions.push(tempLimitCondition);
      }

      for (var k = 0; k < actionList.length; k++) {
        var tempAction = this.actionConversion(actionList[k]);
        tempJson.arg.rule_results.push(tempAction);
      }

      this.sendSHostRequest(tempJson);
    }
    else {
      this.hostErrorLog("async add EX IFTTT @param error");
    }
  },

  /**
   * 对外接口(UI) 更新拓展IFTTT规则
   * @param id
   * @param name
   * @param roomId
   * @param notificationEnable
   * @param ruleEnable
   * @param conditionList
   * @param limitConditions
   * @param actionList
   */
  asyncUpdateEXIFTTT : function(id, name, roomId, notificationEnable, ruleEnable, conditionList, limitConditionList, actionList) {
    if (typeof notificationEnable === "boolean" && typeof ruleEnable === "boolean" &&
        this.isArray(conditionList) && this.isArray(limitConditionList) && this.isArray(actionList)) {
      var tempStr = this.getHostDeviceRequestOperation("VIRTUAL_IFTTT_Rule", this.getHostDeviceConfigAction(), 'updateEXIFTTT');
      var tempJson = JSON.parse(tempStr);
      if (tempJson == null) {
        this.hostErrorLog("async update EX IFTTT get action error[null]");
        return;
      }

      tempJson.nodeid = id;
      tempJson.arg.rule_name = name;
      tempJson.arg.room_id = roomId;
      tempJson.arg.rule_enable = ruleEnable?"1":"0";
      tempJson.arg.notification_use = notificationEnable?"1":"0";
      for (var i = 0; i < conditionList.length; i++) {
        var tempCondition = this.conditionConversion(conditionList[i]);
        tempJson.arg.rule_or_condtions.push(tempCondition);
      }

      for (var j = 0; j < limitConditionList.length; j++) {
        var tempLimitCondition = this.limitConditionConversion(limitConditionList[j]);
        if (limitConditionList[j].limitType == "device") {
          tempLimitCondition.limit_type = "dev_status";
          tempLimitCondition.limit_cond = this.conditionConversion(limitConditionList[j].content);
        }
        else if (limitConditionList[j].limitType == "time") {
          tempLimitCondition.limit_type = "time_fragments";
          tempLimitCondition.limit_cond = [];
          for (var x = 0; x < limitConditionList[j].content.length; x++) {
            var tempLimitTimeCondition = this.limitTimeConditionConversion(limitConditionList[j].content[x]);
            tempLimitCondition.limit_cond.push(tempLimitTimeCondition);
          }
        }
        else {
          tempLimitCondition.limit_type = null;
          tempLimitCondition.limit_cond = null;
          this.hostErrorLog("async add EX IFTTT limit type error[null]");
        }

        tempJson.arg.rule_limit_condtions.push(tempLimitCondition);
      }

      for (var k = 0; k < actionList.length; k++) {
        var tempAction = this.actionConversion(actionList[k]);
        tempJson.arg.rule_results.push(tempAction);
      }

      this.sendSHostRequest(tempJson);
    }
    else {
      this.hostErrorLog("async update EX IFTTT @param error");
    }
  },

  /**
   * ###############################################
   * OPERATE
   * ###############################################
   */

  /**
   * 对外接口(UI) 控制灯的开关
   * @param id
   * @param on 开 / 关  true/false
   */
  asyncOperationSwitchDevices: function (id, on) {
    if (typeof on === 'boolean') {
      var tempStr = this.getHostDeviceRequestOperation('ZIGBEE_Light', this.getHostDeviceOperateAction(), 'switch');
      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async operate light switch get action error[null]");
        return;
      }

      tempData.nodeid = id;
      tempData.arg = on ? "ON" : "OFF";
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationSwitchDevices] @param on error[is not boolean].');
    }
  },

  /**
   * 对外接口(UI) 控制插座的开关
   * @param id
   * @param on 开 / 关  true/false
   */
  asyncOperationSocketSwitchDevices: function (id, on) {
    if (typeof on === 'boolean') {
      var deviceName = this.hostDataRepository.getDeviceNameByNodeId(id);
      var tempStr = this.getHostDeviceRequestOperation(deviceName, this.getHostDeviceOperateAction(), 'switch');
      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async operate socket switch get action error[null]" + deviceName);
        return;
      }

      tempData.nodeid = id;
      tempData.arg = on ? "ON" : "OFF";
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationSwitchDevices] @param on error[is not boolean].');
    }
  },

  /**
   * 对外接口（UI） 控制2002设备的小夜灯的开关
   * @param id
   * @param on
   */
  asyncOperationZigbeeKonkeLightSwitch : function (id, on) {
    if (typeof on === 'boolean') {
      var deviceName = this.hostDataRepository.getDeviceNameByNodeId(id);
      var tempStr = this.getHostDeviceRequestOperation(deviceName, this.getHostDeviceOperateAction(), 'switch');
      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async operate socket switch get action error[null]");
        return;
      }

      tempData.nodeid = id;
      tempData.arg = on ? "ON" : "OFF";
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationSwitchDevices] @param on error[is not boolean].');
    }
  },

  /**
   * 对外接口(UI) 控制电机的开关停
   * @param id
   * @param arg 开 / 关 / 停 OPEN/CLOSE/STOP
   */
  asyncOperationMotorSwitchDevices: function (id, arg) {
    if (arg == "OPEN" || arg == "CLOSE" || arg == "STOP") {
      var tempStr = this.getHostDeviceRequestOperation('ZIGBEE_CurtainMotor', this.getHostDeviceOperateAction(), 'switch');
      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async operate motor get action error[null]");
        return;
      }

      tempData.nodeid = id;
      tempData.arg = arg ;
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationMotorSwitchDevices] @param action error.');
    }
  },

  /**
   * 对外接口(UI) 设备杜亚电机的行程位置
   * @param id
   * @param position
   */
  asyncOperationDOOYAPosition : function(id, position) {
    var tempStr = this.getHostDeviceRequestOperation('ZIGBEE_DOOYAMotor', this.getHostDeviceOperateAction(), 'position');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async operate DOOYA position get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg = position;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口(UI) 配置杜亚电机行程
   * @param id
   */
  asyncConfigDOOYARoute : function(id) {
    var tempStr = this.getHostDeviceRequestOperation('ZIGBEE_DOOYAMotor', this.getHostDeviceOperateAction(), 'routeInit');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async config DOOYA route get action error[null]");
      return;
    }

    tempData.nodeid = id;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口(UI) 执行情景模式
   * @param id
   */
  asyncOperationSceneExecute : function (id) {
    var tempStr = this.getHostDeviceRequestOperation('VIRTUAL_Scene', this.getHostDeviceOperateAction(), 'execute');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async operate scene get action error[null]");
      return;
    }

    tempData.nodeid = id;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口(UI) 打开ZIGBEE网关组网通道
   * 注：打开后网关组网一分钟后，上送NEW_DEVICE信息
   * @param id
   */
  asyncOpenZigbeeNetChannel : function (id) {
    var tempStr = this.getHostDeviceRequestOperation('ZIGBEE_Gateway', this.getHostDeviceOperateAction(), 'openNETChannel');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async operate scene get action error[null]");
      return;
    }

    tempData.nodeid = id;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口(UI) 控制房间内所有灯开关
   * @param id
   * @param on
   */
  asyncOperationZoneLights : function (id, on) {
    if (typeof on === 'boolean') {
      var tempStr = '';
      var tempData = null;
      if (on) {
        tempStr = this.getHostDeviceRequestOperation("VIRTUAL_ZONE_LIGHT", this.getHostDeviceOperateAction(), 'allOn');
        tempData = JSON.parse(tempStr);
      }
      else {
        tempStr = this.getHostDeviceRequestOperation("VIRTUAL_ZONE_LIGHT", this.getHostDeviceOperateAction(), 'allOff');
        tempData = JSON.parse(tempStr);
      }

      if (tempData == null) {
        this.hostErrorLog("async operate zone light switch get action error[null]");
        return;
      }

      tempData.arg = id;
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationZoneLights] @param on error[is not boolean].');
    }
  },

  /**
   * 对外接口(UI) 控制房间内所有窗帘开关
   * @param id
   * @param arg
   */
  asyncOperationZoneCurtains : function (id, arg) {
    if (arg == "OPEN" || arg == "CLOSE" || arg == "STOP") {
      var tempStr = '';
      var tempData = null;
      if (arg == "OPEN") {
        tempStr = this.getHostDeviceRequestOperation("VIRTUAL_ZONE_CURTAIN", this.getHostDeviceOperateAction(), 'allOpen');
        tempData = JSON.parse(tempStr);
      }
      else if (arg == "CLOSE") {
        tempStr = this.getHostDeviceRequestOperation("VIRTUAL_ZONE_CURTAIN", this.getHostDeviceOperateAction(), 'allClose');
        tempData = JSON.parse(tempStr);
      }
      else {
        tempStr = this.getHostDeviceRequestOperation("VIRTUAL_ZONE_CURTAIN", this.getHostDeviceOperateAction(), 'allStop');
        tempData = JSON.parse(tempStr);
      }

      if (tempData == null) {
        this.hostErrorLog("async operate zone curtain switch get action error[null]");
        return;
      }

      tempData.arg = id;
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationZoneCurtains] @param action error.');
    }
  },

  /**
   * 对外接口（UI） 取消SOS面板的报警
   * @param panelId
   */
  asyncCancelSOSPanelAlarm : function(panelId) {
    var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_SOSPanel", this.getHostDeviceOperateAction(), 'cancelAlarm');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async Cancel SOS Panel Alarm get action error[null]");
      return;
    }

    tempData.nodeid = panelId;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 打开门锁
   * @param id
   * @param password
   */
  asyncOpenDoorLock : function (id, password) {
    var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_Lock800", this.getHostDeviceOperateAction(), 'openLock');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async open lock get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg.password = password;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） Konke门锁同步时间
   * @param id
   * @param time
   */
  asyncSynchKonkeLockTime : function(id, time) {
    var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_KonkeLock", this.getHostDeviceConfigAction(), 'synchTime');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async synch konke lock time, get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg = time;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） Konke门锁获取用户信息
   * @param id
   */
  asyncGetKonkeLockUserInfo : function(id) {
    var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_KonkeLock", this.getHostDeviceConfigAction(), 'getUserInfo');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async synch konke lock time, get action error[null]");
      return;
    }

    tempData.nodeid = id;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） Konke门锁获取开锁日志
   * @param id
   */
  asyncGetKonkeLockOpenLog : function(id) {
    var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_KonkeLock", this.getHostDeviceConfigAction(), 'getOpenLog');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async synch konke lock time, get action error[null]");
      return;
    }

    tempData.nodeid = id;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） Konke门锁设置用户昵称
   * @param id
   * @param userId
   * @param OpenType
   * @param nickname
   */
  asyncSetKonkeLockUserNickname : function(id, userId, openType, nickname) {
    var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_KonkeLock", this.getHostDeviceConfigAction(), 'setUserName');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async synch konke lock time, get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg.userid = userId;
    tempData.arg.open_type = openType;
    tempData.arg.user_nickname = nickname;
    this.sendSHostRequest(tempData);
  },

  asyncBindKonekLockDoorSensor : function() {
  },

  /**
   * 对外接口（UI） Konke插座配置名称、房间
   * @param id
   * @param roomId
   * @param name
   */
  asyncEditKonkeSocketConfig : function (id, roomId, name) {
    var tempStr = this.getHostDeviceRequestOperation("NET_KonkeSocket", this.getHostDeviceConfigAction(), 'editSocket');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async synch konke socket time, get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg.room_id = roomId;
    tempData.arg.name = name;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 删除Konke插座
   * @param id
   */
  asyncDeleteKonkeSocket : function(id) {
    var tempStr = this.getHostDeviceRequestOperation("NET_KonkeSocket", this.getHostDeviceConfigAction(), 'deleteSocket');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async synch konke socket time, get action error[null]");
      return;
    }

    tempData.nodeid = id;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口(UI) 控制konke插座的开关
   * @param id
   * @param on 开 / 关  true/false
   */
  asyncOperationKonkeSocketSwitch : function(id, on) {
    if (typeof on === 'boolean') {
      var tempStr = this.getHostDeviceRequestOperation('NET_KonkeSocket', this.getHostDeviceOperateAction(), 'switch');
      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async operate konke socket switch get action error[null]");
        return;
      }

      tempData.nodeid = id;
      tempData.arg = on ? "ON" : "OFF";
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationKonkeSocketSwitch] @param on error[is not boolean].');
    }
  },

  /**
   * 对外接口(UI) 控制konke插座小夜灯的开关
   * @param id
   * @param on 开 / 关  true/false
   */
  asyncOperationKonkeSocketLightSwitch : function(id, on) {
    if (typeof on === 'boolean') {
      var tempStr = this.getHostDeviceRequestOperation('NET_KonkeSocket', this.getHostDeviceOperateAction(), 'lightSwitch');
      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async operate konke socket light switch get action error[null]");
        return;
      }

      tempData.nodeid = id;
      tempData.arg = on ? "ON" : "OFF";
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationKonkeSocketLightSwitch] @param on error[is not boolean].');
    }
  },

  /**
   * 对外接口(UI) 控制konke插座USB的开关
   * @param id
   * @param on 开 / 关  true/false
   */
  asyncOperationKonkeSocketUSBSwitch : function(id, on) {
    if (typeof on === 'boolean') {
      var tempStr = this.getHostDeviceRequestOperation('NET_KonkeSocket', this.getHostDeviceOperateAction(), 'USBSwitch');
      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async operate konke socket USB switch get action error[null]");
        return;
      }

      tempData.nodeid = id;
      tempData.arg = on ? "ON" : "OFF";
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationKonkeSocketUSBSwitch] @param on error[is not boolean].');
    }
  },

  /**
   * 对外接口（UI） Konket调光灯配置名称、房间
   * @param id
   * @param roomId
   * @param name
   */
  asyncEditKonkeLightConfig : function (id, roomId, name) {
    var tempStr = this.getHostDeviceRequestOperation("NET_KonkeLight", this.getHostDeviceConfigAction(), 'editLight');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async synch konke light time, get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg.room_id = roomId;
    tempData.arg.name = name;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 删除Konke调光灯
   * @param id
   */
  asyncDeleteKonkeLight : function(id) {
    var tempStr = this.getHostDeviceRequestOperation("NET_KonkeLight", this.getHostDeviceConfigAction(), 'deleteLight');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async synch konke light time, get action error[null]");
      return;
    }

    tempData.nodeid = id;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 控制konke可调光灯
   * @param id
   * @param on boolean
   * @param rgb array
   * @param brightness
   * {"on":true,"rgb":[255,255,255],"bri":100}
   */
  asyncOperationKonkeLight : function(id, on, rgb, brightness) {
    if (typeof on === 'boolean' && this.isArray(rgb)) {
      var tempStr = this.getHostDeviceRequestOperation('NET_KonkeLight', this.getHostDeviceOperateAction(), 'setLight');
      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async operate konke light get action error[null]");
        return;
      }

      tempData.nodeid = id;
      tempData.arg.on = on;
      tempData.arg.rgb = rgb;
      tempData.arg.bri = brightness;
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationKonkeLight] @param error.');
    }
  },

  /**
   * 对外接口（UI） 调节konke灯的模式
   * @param id
   * @param model
   * @param speed
   */
  asyncSetKonkeLightModel : function(id, speed) {
    var tempStr = this.getHostDeviceRequestOperation('NET_KonkeLight', this.getHostDeviceOperateAction(), 'setModel');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async set konke light model get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg.model_arg.speed = speed;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 配置快捷面板的按键动作
   * @param id
   * @param index
   * @param action 情景模式动作
   */
  asyncEditShortcutPanelButtonAction : function (id, index, action) {
    if (typeof action !== 'object') {
      this.hostErrorLog('[asyncEditShortcutPanelButtonAction] @param error.');
    }
    else {
      if (this.isArray(action) || action == null) {
        this.hostErrorLog('[asyncEditShortcutPanelButtonAction] @param error.');
      }
      else{
        var tempStr = this.getHostDeviceRequestOperation('ZIGBEE_ShortcutPanel', this.getHostDeviceConfigAction(), 'configPanelAction');
        var tempData = JSON.parse(tempStr);
        if (tempData == null) {
          this.hostErrorLog("async edit shortcut panel action get action error[null]");
          return;
        }

        tempData.nodeid = id;
        tempData.arg[0].button_id = index;
        tempData.arg[0].action = this.shortcutPanelActionConversion(action);
        this.sendSHostRequest(tempData);
      }
    }
  },

  /**
   * 对外接口（UI） 激活快捷面板上面的按键动作
   * @param id
   * @param index
   */
  asyncActivateShortcutPanelButton : function(id, index) {
    var tempStr = this.getHostDeviceRequestOperation('ZIGBEE_ShortcutPanel', this.getHostDeviceOperateAction(), 'activate');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async activate shortcut button get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg = index;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 打开/关闭 报警器
   * @param id
   * @param on
   */
  asyncOperatetionAlertorSwitchValve : function(id, on) {
    if (typeof on !== "boolean") {
      this.hostErrorLog("async operation alertor valve  @param on error[is not boolean]");
      return;
    }
    else {
      if (on) {
        var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_Alertor", this.getHostDeviceOperateAction(), 'open');
        var tempJson = JSON.parse(tempStr);
        if (tempJson == null) {
          this.hostErrorLog("async open alertor valve get action error[null]");
          return;
        }

        tempJson.nodeid = id;
        this.sendSHostRequest(tempJson);
      }
      else {
        var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_Alertor", this.getHostDeviceOperateAction(), 'close');
        var tempJson = JSON.parse(tempStr);
        if (tempJson == null) {
          this.hostErrorLog("async close alertor valve get action error[null]");
          return;
        }

        tempJson.nodeid = id;
        this.sendSHostRequest(tempJson);
      }
    }
  },

  /**
   * 对外接口（UI） Konket加湿器配置名称、房间
   * @param id
   * @param roomId
   * @param name
   */
  asyncEditKonkeHumidifierConfig : function (id, roomId, name) {
    var tempStr = this.getHostDeviceRequestOperation("NET_KonkeHumidifier", this.getHostDeviceConfigAction(), 'editHumidifier');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async edit konke Humidifier config, get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg.room_id = roomId;
    tempData.arg.name = name;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 删除Konke加湿器
   * @param id
   */
  asyncDeleteKonkeHumidifier : function(id) {
    var tempStr = this.getHostDeviceRequestOperation("NET_KonkeHumidifier", this.getHostDeviceConfigAction(), 'deleteHumidifier');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async delete konke Humidifier , get action error[null]");
      return;
    }

    tempData.nodeid = id;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 开关 Konke 加湿器
   * @param id
   * @param on
   */
  asyncOperationKonkeHumidifierSwtich : function(id, on) {
    if (typeof on === 'boolean' ) {
      var tempStr = this.getHostDeviceRequestOperation('NET_KonkeHumidifier', this.getHostDeviceOperateAction(), 'switch');
      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async operate konke Humidifier switch get action error[null]");
        return;
      }

      tempData.nodeid = id;
      tempData.arg = on ? "ON" : "OFF";
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationKonkeHumidifierSwtich] @param error.');
    }
  },

  /**
   * 对外接口（UI） 调节加湿器的雾气大小
   * @param id
   * @param value
   */
  asyncOperationKonkeHumidifierFog : function(id, value) {
    var tempStr = this.getHostDeviceRequestOperation('NET_KonkeHumidifier', this.getHostDeviceOperateAction(), 'quantity');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async operate konke Humidifier fog get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg = value;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 设置Konke加湿器持续保持湿度数值
   * @param id
   * @param on
   * @param value 10-90 string
   */
  asyncSetKonkeHumidifierHumidness : function(id, on, value) {
    if (typeof on === 'boolean' ) {
      var tempStr = this.getHostDeviceRequestOperation('NET_KonkeHumidifier', this.getHostDeviceOperateAction(), 'moisturize');
      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async operate konke Humidifier fog get action error[null]");
        return;
      }

      tempData.nodeid = id;
      tempData.arg.on = on;
      tempData.arg.vol = value;
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncSetKonkeHumidifierHumidness] @param error.');
    }
  },

  /**
   * 对外接口（UI） Konket空气净化器配置名称、房间
   * @param id
   * @param roomId
   * @param name
   */
  asyncEditKonkeAircleanerConfig : function (id, roomId, name) {
    var tempStr = this.getHostDeviceRequestOperation("NET_KonkeAircleaner", this.getHostDeviceConfigAction(), 'editAircleaner');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async Edit Konke Aircleaner Config, get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg.room_id = roomId;
    tempData.arg.name = name;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 删除Konke空气净化器
   * @param id
   */
  asyncDeleteKonkeAircleaner : function(id) {
    var tempStr = this.getHostDeviceRequestOperation("NET_KonkeAircleaner", this.getHostDeviceConfigAction(), 'deleteAircleaner');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async delete konke Aircleaner, get action error[null]");
      return;
    }

    tempData.nodeid = id;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 开关 Koneke 空气净化器
   * @param id
   * @param on
   */
  asyncOperationKonekeAircleanerSwitch : function(id, on) {
    if (typeof on === 'boolean' ) {
      var tempStr = this.getHostDeviceRequestOperation('NET_KonkeAircleaner', this.getHostDeviceOperateAction(), 'switch');
      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async operate konke Aircleaner switch get action error[null]");
        return;
      }

      tempData.nodeid = id;
      tempData.arg = on ? "ON" : "OFF";
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationKonekeAircleanerSwitch] @param error.');
    }
  },

  /**
   * 对外接口（UI） 切换空气净化器的模式
   * @param id
   * @param mode
   */
  asyncSetKonekeAircleanerMode : function(id, mode) {
    var tempStr = this.getHostDeviceRequestOperation('NET_KonkeAircleaner', this.getHostDeviceOperateAction(), 'setMode');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async operate konke Aircleaner switch get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg = mode;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 开关 Koneke 空气净化器的负离子功能
   * @param id
   * @param on
   */
  asyncOperationKonekeAircleanerAnionSwitch : function(id, on) {
    if (typeof on === 'boolean' ) {
      var tempStr = this.getHostDeviceRequestOperation('NET_KonkeAircleaner', this.getHostDeviceOperateAction(), 'switchAnion');
      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async operate konke Aircleaner anion switch get action error[null]");
        return;
      }

      tempData.nodeid = id;
      tempData.arg = on ? "ON" : "OFF";
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationKonekeAircleanerAnionSwitch] @param error.');
    }
  },

  /**
   * 对外接口（UI） 调节Konke空气净化器的风速
   * @param id
   * @param speed [1-4] string
   */
  asyncSetKonekeAircleanerWind : function(id, speed) {
    var tempStr = this.getHostDeviceRequestOperation('NET_KonkeAircleaner', this.getHostDeviceOperateAction(), 'setWind');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async operate konke Aircleaner wind speed get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg = speed;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 学习按键的红外码
   * @param id
   * @param buttonId
   */
  asyncLearnInfraredCodes : function(id, buttonId) {
    var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_InfraredTransponder", this.getHostDeviceConfigAction(), 'learnInfrared');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async learn infrared code , get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg = buttonId;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 保存按键的红外码
   * @param id
   * @param buttonId
   */
  asyncSaveInfraredCodes : function(id, buttonId) {
    var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_InfraredTransponder", this.getHostDeviceConfigAction(), 'saveInfrared');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async save infrared code , get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg = buttonId;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 保存红外遥控器的界面
   * @param id
   * @param buttons [{"id":"","status":"","icon":"","name":""}]
   */
  asyncSaveInfraredControlInterface : function(id, buttons) {
    if (this.isArray(buttons)) {
      var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_InfraredTransponder", this.getHostDeviceConfigAction(), 'saveInterface');
      var tempData = JSON.parse(tempStr);

      if (tempData == null) {
        this.hostErrorLog("async save infrared device Interface, get action error[null]");
        return;
      }

      tempData.nodeid = id;
      this.cloneArray(buttons, tempData.arg);
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncSaveInfraredControlInterface] @param error.');
    }
  },

  /**
   * 对外接口（UI） 绑定红外设备的插座
   * @param id
   * @param socketId -1 时未绑定
   */
  asyncBindInfraredDeviceSocket : function(id, socketId) {
    var tempStr = this.getHostDeviceRequestOperation("ZIGBEE_InfraredTransponder", this.getHostDeviceConfigAction(), 'bindSocket');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async bind infrared device socket , get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg = socketId;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 发射红外码
   * @param id
   * @param buttonId
   */
  asyncLaunchInfraredCodes : function(id, buttonId) {
    var tempStr = this.getHostDeviceRequestOperation('ZIGBEE_InfraredTransponder', this.getHostDeviceOperateAction(), 'sendInfrared');
    var tempData = JSON.parse(tempStr);
    if (tempData == null) {
      this.hostErrorLog("async Launch Infrared Codes get action error[null]");
      return;
    }

    tempData.nodeid = id;
    tempData.arg = buttonId;
    this.sendSHostRequest(tempData);
  },

  /**
   * 对外接口（UI） 智能打开红外设备（条件，设备已经绑定插座2002---2004）
   * @param id
   * @param buttonId
   */
  asyncSmartSwitchInfraredDevice : function(id, on) {
    if (typeof on === 'boolean' ) {
      var tempStr = "";
      if (on) {
        tempStr = this.getHostDeviceRequestOperation('ZIGBEE_InfraredTransponder', this.getHostDeviceOperateAction(), 'smartSwitchOn');
      }
      else {
        tempStr = this.getHostDeviceRequestOperation('ZIGBEE_InfraredTransponder', this.getHostDeviceOperateAction(), 'smartSwitchOff');
      }

      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async smart switch Infrared Codes get action error[null]");
        return;
      }

      tempData.nodeid = id;
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncSmartSwitchInfraredDevice] @param error.');
    }
  },

  /**
   * 对外接口（UI） 激活Hue灯的网关
   * @param gatewayId
   */
  asyncActiveHueGateway : function(gatewayId) {
    var tempStr = this.getHostDeviceRequestOperation("NET_HueLight", this.getHostDeviceConfigAction(), 'activeGateWay');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async active hue gateway get action error[null]");
      return;
    }

    tempJson.nodeid = gatewayId;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口（UI） 打开Hue灯网关的组网通道
   * @param gatewayId
   */
  asyncOpenHueGatewayNetChannel : function(gatewayId) {
    var tempStr = this.getHostDeviceRequestOperation("NET_HueLight", this.getHostDeviceConfigAction(), 'openGateWay');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async open hue gateway get action error[null]");
      return;
    }

    tempJson.nodeid = gatewayId;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口（UI） 编辑Hue灯设备的配置信息
   * @param lightId
   * @param name
   * @param roomId
   * @param icon
   */
  asyncEditHueLightDeviceInfo : function(lightId, name, roomId, icon) {
    var tempStr = this.getHostDeviceRequestOperation("NET_HueLight", this.getHostDeviceConfigAction(), 'editDevice');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async edit hue light info get action error[null]");
      return;
    }

    tempJson.arg.name = name;
    tempJson.arg.room_id = roomId;
    tempJson.arg.icon = icon;
    tempJson.nodeid = lightId;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口（UI） 删除Hue灯设备
   * @param lightId
   */
  asyncDeleteHueLightDevice : function(lightId) {
    var tempStr = this.getHostDeviceRequestOperation("NET_HueLight", this.getHostDeviceConfigAction(), 'deleteDevice');
    var tempJson = JSON.parse(tempStr);
    if (tempJson == null) {
      this.hostErrorLog("async delete hue light get action error[null]");
      return;
    }

    tempJson.nodeid = lightId;
    this.sendSHostRequest(tempJson);
  },

  /**
   * 对外接口（UI） 操作Hue灯的控制 调色  开关 调节亮度
   * @param lightId
   * @param on
   * @param xy
   * @param brightness
   */
  asyncOperationHueLight : function(lightId, on, xy, brightness) {
    if (typeof on === 'boolean' && this.isArray(xy)) {
      var tempStr = this.getHostDeviceRequestOperation('NET_HueLight', this.getHostDeviceOperateAction(), 'setLight');
      var tempData = JSON.parse(tempStr);
      if (tempData == null) {
        this.hostErrorLog("async operate hue light get action error[null]");
        return;
      }

      tempData.nodeid = id;
      tempData.arg.on = on;
      tempData.arg.xy = xy;
      tempData.arg.bri = brightness;
      this.sendSHostRequest(tempData);
    }
    else {
      this.hostErrorLog('[asyncOperationHueLight] @param error.');
    }
  },

  func : function () {}
};
