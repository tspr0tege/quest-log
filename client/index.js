import React from 'react';
import { render } from 'react-dom';

import App from './src/App.jsx';

// render(<App />, document.getElementById('app'));

const testData = {
  "410038db-8b88-4109-bb1c-de49506f4a10": {
    "quest_id": "410038db-8b88-4109-bb1c-de49506f4a10",
    "owner_id": "627174590b1479006f5e723d",
    "title": "Turn Nginx notes into two blog articles",
    "notes": null,
    "parent_id": null,
    "prog_to_parent": null,
    "time_frame": null,
    "progress": 0,
    "is_complete": false,
    "createdAt": "2023-12-20T06:03:23.720Z",
    "updatedAt": "2023-12-20T06:03:23.720Z",
    "child_ids": []
  },
  "66cd5f10-0f11-4f92-b378-5423413af22f": {
    "quest_id": "66cd5f10-0f11-4f92-b378-5423413af22f",
    "owner_id": "627174590b1479006f5e723d",
    "title": "Purchase squall-leonhart.codes on namecheap",
    "notes": null,
    "parent_id": null,
    "prog_to_parent": null,
    "time_frame": null,
    "progress": 0,
    "is_complete": false,
    "createdAt": "2024-09-09T19:02:00.118Z",
    "updatedAt": "2024-09-09T19:02:00.118Z",
    "child_ids": []
  },
  "01e522ba-066c-4792-8a83-d1e6852a7da6": {
    "quest_id": "01e522ba-066c-4792-8a83-d1e6852a7da6",
    "owner_id": "627174590b1479006f5e723d",
    "title": "Call Kia about recalls",
    "notes": null,
    "parent_id": null,
    "prog_to_parent": null,
    "time_frame": null,
    "progress": 0,
    "is_complete": false,
    "createdAt": "2024-10-22T03:17:29.921Z",
    "updatedAt": "2024-10-22T03:17:29.921Z",
    "child_ids": ["80d83c79-9d80-48f9-9efa-f36d26fba3ab"]
  },
  "80d83c79-9d80-48f9-9efa-f36d26fba3ab": {
    "quest_id": "80d83c79-9d80-48f9-9efa-f36d26fba3ab",
    "owner_id": "627174590b1479006f5e723d",
    "title": "Do research on vehicles",
    "notes": null,
    "parent_id": "01e522ba-066c-4792-8a83-d1e6852a7da6",
    "prog_to_parent": null,
    "time_frame": null,
    "progress": 0,
    "is_complete": false,
    "createdAt": "2024-10-22T03:17:48.360Z",
    "updatedAt": "2024-10-22T03:17:48.360Z",
    "child_ids": []
  },
  "9f097798-d47d-40ce-868e-685d7469a71c": {
    "quest_id": "9f097798-d47d-40ce-868e-685d7469a71c",
    "owner_id": "627174590b1479006f5e723d",
    "title": "Look into legal structures to protect my income",
    "notes": null,
    "parent_id": null,
    "prog_to_parent": null,
    "time_frame": null,
    "progress": 0,
    "is_complete": false,
    "createdAt": "2024-10-22T03:18:14.080Z",
    "updatedAt": "2024-10-22T03:18:14.080Z",
    "child_ids": []
  }
};


import DnDQuestTree from '@src/components/DnDQuestTree.jsx';

render(<DnDQuestTree data={testData}/>, document.getElementById('app'));