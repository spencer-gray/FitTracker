# helper function to format minified json data

import json
import copy

with open('../../data/exercises-min.json') as dataf, open('../../data/exercises.json', 'w') as out:
    data = json.load(dataf)
    newdata = []
    for i, block in enumerate(data):
        new = dict(pk=block['id'])
        new['fields'] = dict(name=block['name'],
                             description=block['description'],
                             category=block['category'],
                             muscles=block['muscles'],
                             secondary_muscle=block['muscles_secondary'])
        newdata.append(copy.deepcopy(new))
    json.dump(newdata, out, indent=2)