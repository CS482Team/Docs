# Version Control

## Branches

| Branch | Updated when... |
| - | - |
| main | sprint ends |
| develop | feature/fix done |
| feature/fix | whenever you want |

## New Branch

Create your branch off of develop branch:
```bash
git switch develop
git pull origin develop
git checkout -b <new-branch-name>
... # Code stuff
git commit #...
git push -u origin <new-branch-name>
```

### Branch Naming

```bash
feature/{issue-number}-{whatever-you-want} # feature/13-sort-search-results
fix/{issue-number}-{whatever-you-want}     # fix/14-remove-sort-error
```

## Commit Messages

Include the issue number at the start of your commit message:
```bash
git commit -m "#15 Add assets folder"
```

If you already wrote the commit message and forgot to add the issue number:
```bash
git commit --amend -m "#15 Add assets folder
git push # If you ALSO already pushed to remote branch, instead use: git push --force-with-lease
```

## Pull Requests

Request to update the develop branch with the changes on your branch:
- Repository > Pull Requests > New Pull Request
- Target: `develop`
- Source: `new-branch-name`

At the end of a sprint:
- Target: `main`
- Source: `develop`
